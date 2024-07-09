import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import BrowserOnly from '@docusaurus/BrowserOnly'
import { useHookstate } from '@hookstate/core'
import {
  useIonToast,
} from '@ionic/react'

import styles from './index.module.css'
import {
  actions, playlists, stored,
} from './data'
import Nav from './Nav'
import Player from '../Player'

const fullPath = (file) => `/audio/e-tcm/${file}`

export default function ETcm() {
  const player = useRef(null)
  const [toast] = useIonToast()
  const store = useHookstate(stored)
  const {
    file, list, timed,
  } = store.get()
  const playlist = useMemo(() => playlists[list], [list])
  const src = useMemo(() => playlist.map(fullPath), [playlist])
  const fileIndex = useMemo(() => playlist.indexOf(file), [playlist, file])
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState(false)
  const { pick } = actions
  const withPlay = (func) => (...args) => {
    func.apply(this, args)
    const nextState = store.get()
    const now = nextState.list === list && nextState.file === file
    player.current.play(now)
  }
  const pickAndPlay = withPlay(pick)
  const onChange = (key, value) => {
    switch (key) {
      case 'index': pick(list, playlist[value]); break
      case 'status': setStatus(value); break
      default: break
    }
  }
  useEffect(() => {
    if (!timed) toast({
      color: 'warning',
      duration: 1500,
      message: '按时播放已关闭',
      position: 'top',
    })
  }, [timed])
  return (
    <>
      <div className={styles.etcm}>
        <Nav withPlay={withPlay} />
        <div className={styles.title}>E-TCM Player</div>
        <div className={styles.subtitle}>听电子中药，享赛博朋克</div>
        <Player
          appearance="music"
          index={fileIndex}
          onChange={onChange}
          onPlaylist={() => setOpen(true)}
          ref={player}
          src={src}
        />
      </div>
      <BrowserOnly fallback={<div>Loading...</div>}>
        {() => {
          const Playlists = require('@site/src/components/E-tcm/Playlists').default
          return (
              <Playlists
                  onClose={() => setOpen(false)}
                  onPick={pickAndPlay}
                  open={open}
                  status={status}
              />
          )
        }}
      </BrowserOnly>
    </>
  )
}

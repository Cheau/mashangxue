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
  actions, derived, stored,
} from './data/index'
import { noproxy } from './data/stored'
import Nav from './Nav'
import Player from '../Player'

const fullPath = (file) => `/audio/e-tcm/${file}`

export default function ETcm() {
  const player = useRef(null)
  const [toast] = useIonToast()
  const computed = useHookstate(derived)
  const store = useHookstate(stored)
  const { playlist, settings } = computed.get(noproxy)
  const {
    file, list, timed,
  } = store.get(noproxy)
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
    if (fileIndex < 0) pick(list, playlist[0])
  }, [fileIndex, playlist])
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
          settings={settings}
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

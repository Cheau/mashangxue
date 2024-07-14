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
  actions, noproxy, playlists, stored,
} from './data'
import Nav from './Nav'
import Player from '../Player'

const fullPath = (file) => `/audio/e-tcm/${file}`

const toArray = (obj, keys) => {
  if (typeof obj !== 'object') return keys.map(() => undefined)
  return keys.map((key) => obj[key])
}

export default function ETcm() {
  const player = useRef(null)
  const [toast] = useIonToast()
  const store = useHookstate(stored)
  const {
    file, list, timed,
  } = store.get(noproxy)
  const setting = useMemo(() => {
    const data = store.settings.get(noproxy) ?? {}
    if (list === 'all') return store.order.flatMap((o) => toArray(data[o], playlists[o]))
    return toArray(data[list], playlists[list])
  }, [list, store.order, store.settings])
  const playlist = useMemo(() => playlists[list].filter((item, i) => !setting[i]?.disabled), [list, setting])
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

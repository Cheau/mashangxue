import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import BrowserOnly from '@docusaurus/BrowserOnly'
import { usePluginData } from '@docusaurus/useGlobalData'
import { useHookstate } from '@hookstate/core'
import { IonToggle } from '@ionic/react'
import { GiAlarmClock } from 'react-icons/gi'

import styles from './index.module.css'
import {
  icons, playlists, stored, restore, theory,
} from './data'
import Player from '../Player'
import { formatRange } from './utils'

const fullPath = (file) => `/audio/e-tcm/${file}`

export default function ETcm() {
  const id = usePluginData('ETcm-plugin')
  const player = useRef(null)
  const store = useHookstate(stored)
  const {
    file, list, ri, ranges, timed,
  } = store.get()
  const playlist = useMemo(() => playlists[list].map(fullPath), [list])
  const index = useMemo(() => playlist.indexOf(file), [playlist, file])
  const { effect } = theory[list]
  const icon = icons[list]
  const range = ranges[list][ri]
  const [open, setOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const onChange = (key, value) => {
    switch (key) {
      case 'status': setPlaying(value === 'playing'); break
      default: break
    }
  }
  const onPick = (nextList, nextFile) => store.merge({
    file: nextFile,
    timed: timed ? nextList === list : false,
  })
  return (
    <>
      <div className={styles.etcm}>
        <div className={styles.desc}>
          <span className={styles.iconic}>
            {icon}{effect}
          </span>
          {timed && <span className={styles.iconic}>
            <GiAlarmClock/>{formatRange(range)}
          </span>}
          {!timed && <IonToggle checked={timed} onClick={() => setTimed(!timed)}>
            按时播放
          </IonToggle>}
        </div>
        <div className={styles.title}>E-TCM Player</div>
        <div className={styles.subtitle}>听电子中药，享赛博朋克</div>
        <Player
          appearance="music"
          index={index}
          onChange={onChange}
          onPlaylist={() => setOpen(true)}
          ref={player}
          src={playlist}
        />
      </div>
      <BrowserOnly fallback={<div>Loading...</div>}>
        {() => {
          const Playlists = require('@site/src/components/E-tcm/Playlists').default
          return (
              <Playlists
                  onClose={() => setOpen(false)}
                  onPick={onPick}
                  onReset={restore}
                  open={open}
                  playing={playing}
              />
          )
        }}
      </BrowserOnly>
    </>
  )
}

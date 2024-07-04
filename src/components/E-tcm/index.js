import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import BrowserOnly from '@docusaurus/BrowserOnly'
import { useHookstate } from '@hookstate/core'
import { IonToggle, useIonToast } from '@ionic/react'
import { GiAlarmClock } from 'react-icons/gi'

import styles from './index.module.css'
import {
  actions, icons, playlists, stored, theory,
} from './data'
import Player from '../Player'
import { formatRange } from './utils'

const fullPath = (file) => `/audio/e-tcm/${file}`

export default function ETcm() {
  const player = useRef(null)
  const [toast] = useIonToast()
  const store = useHookstate(stored)
  const {
    fileIndex, list, rangeIndex, ranges, timed,
  } = store.get()
  const playlist = useMemo(() => playlists[list].map(fullPath), [list])
  const { effect } = theory[list]
  const icon = icons[list]
  const range = ranges[list][rangeIndex]
  const [open, setOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const { pick, playByTime } = actions
  const withPlay = (func) => (e, ...args) => {
    func.apply(this, args)
    player.current.play(e)
  }
  const onChange = (key, value) => {
    switch (key) {
      case 'index': pick(list, playlists[list][value]); break
      case 'status': setPlaying(value === 'playing'); break
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
        <div className={styles.desc}>
          <span className={styles.iconic}>
            {icon}{effect}
          </span>
          {timed && <span className={styles.iconic}>
            <GiAlarmClock/>{formatRange(range)}
          </span>}
          {!timed && <IonToggle checked={timed} onClick={withPlay(playByTime)}>
            按时播放
          </IonToggle>}
        </div>
        <div className={styles.title}>E-TCM Player</div>
        <div className={styles.subtitle}>听电子中药，享赛博朋克</div>
        <Player
          appearance="music"
          onChange={onChange}
          onPlaylist={() => setOpen(true)}
          ref={player}
          src={playlist}
          value={fileIndex}
        />
      </div>
      <BrowserOnly fallback={<div>Loading...</div>}>
        {() => {
          const Playlists = require('@site/src/components/E-tcm/Playlists').default
          return (
              <Playlists
                  onClose={() => setOpen(false)}
                  onPick={withPlay(pick)}
                  open={open}
                  playing={playing}
              />
          )
        }}
      </BrowserOnly>
    </>
  )
}

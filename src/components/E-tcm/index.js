import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import BrowserOnly from '@docusaurus/BrowserOnly'
import { useHookstate } from '@hookstate/core'
import {
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonToggle,
  useIonToast,
} from '@ionic/react'
import { GiAlarmClock } from 'react-icons/gi'

import styles from './index.module.css'
import {
  actions, icons, mapping, playlists, stored, theory,
} from './data'
import Player from '../Player'
import { formatRange } from './utils'

const fullPath = (file) => `/audio/e-tcm/${file}`

export default function ETcm() {
  const player = useRef(null)
  const [toast] = useIonToast()
  const store = useHookstate(stored)
  const {
    file, fileIndex, list, rangeIndex, ranges, timed,
  } = store.get()
  const playlist = useMemo(() => playlists[list].map(fullPath), [list])
  const mappedList = list === 'all' ? mapping[file] : list
  const { effect } = theory[mappedList]
  const range = ranges[list][rangeIndex]
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState(false)
  const { pick, playByTime } = actions
  const withPlay = (func) => (...args) => {
    func.apply(this, args)
    const nextState = store.get()
    const now = nextState.list === list && nextState.fileIndex === fileIndex
    player.current.play(now)
  }
  const pickAndPlay = withPlay(pick)
  const onChange = (key, value) => {
    switch (key) {
      case 'index': pick(list, playlists[list][value]); break
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
        <div className={styles.desc}>
          <IonSegment style={{ width: '150px' }} mode="ios" onClick={console.log} value={list}>
            <IonSegmentButton onClick={() => pickAndPlay(mappedList, file)} value={mappedList}>
              <IonLabel className={styles.iconic}>{icons[mappedList]}{effect}</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton onClick={() => pickAndPlay('all', file)} value="all">
              <IonLabel className={styles.iconic}>{icons.all}全部</IonLabel>
            </IonSegmentButton>
          </IonSegment>
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
          index={fileIndex}
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

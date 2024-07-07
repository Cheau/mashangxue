import React from 'react'
import { useHookstate } from '@hookstate/core'
import { GiAlarmClock } from 'react-icons/gi'
import { IonSelect, IonSelectOption, IonToggle } from '@ionic/react'

import styles from './Nav.module.css'
import {
  actions, icons, stored, theory,
} from './data'
import { formatRange } from './utils'

export default function Nav(props) {
  const { withPlay } = props
  const store = useHookstate(stored)
  const {
    list, order, rangeIndex, ranges, timed,
  } = store.get()
  const range = ranges[list][rangeIndex]
  const { pick, playByTime } = actions
  const pickAndPlay = withPlay(pick)
  return (
      <div className={styles.nav}>
        <div className={styles.list}>
          <IonSelect
              interface="popover"
              mode="ios"
              onIonChange={({ detail }) => pickAndPlay(detail.value)}
              value={list}
          >
            <span className={styles.iconic} slot="start">{icons[list]}</span>
            <IonSelectOption value="all">全部</IonSelectOption>
            {order.map((item) => (
                <IonSelectOption key={item} value={item}>
                  {theory[item].effect}
                </IonSelectOption>
            ))}
            <IonSelectOption disabled value="off">{theory.off.effect}</IonSelectOption>
          </IonSelect>
        </div>
        {timed && <span className={styles.iconic}>
            <GiAlarmClock/>{formatRange(range)}
          </span>}
        {!timed && <IonToggle checked={timed} onClick={withPlay(playByTime)}>
          按时播放
        </IonToggle>}
      </div>

  )
}

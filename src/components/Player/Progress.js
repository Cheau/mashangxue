import React, { useEffect, useState } from 'react'
import { IonRange } from '@ionic/react'

import styles from './Progress.module.css'

const padTime = (time = 0) => String(time).padStart(2, '0')

const toTime = (seconds = 0) => {
  let hour, minute, second, remain = seconds
  if (remain > 3600) {
    hour = Math.floor(remain / 3600)
    remain = remain - hour * 3600
  }
  if (remain > 60) {
    minute = Math.floor(remain / 60)
    remain = remain - minute * 60
  }
  second = Math.floor(remain)
  return `${hour ? `${padTime(hour)}:` : ''}${padTime(minute)}:${padTime(second)}`
}

export default function Progress({ max, onChange, value }) {
  const [knob, setKnob] = useState(value)
  const [moving, setMoving] = useState(false)
  useEffect(() => {
    if (!moving) setKnob(value)
  }, [value])
  return (
      <IonRange
          className={styles.progress}
          max={max ?? 100} mode="md"
          onIonChange={({ detail }) => {
            setMoving(false)
            onChange(detail.value)
          }}
          onIonInput={({ detail }) => setKnob(detail.value)}
          onIonKnobMoveStart={() => setMoving(true)}
          pin
          pinFormatter={toTime}
          value={knob}
      >
        <span className={styles.label} slot="start">{toTime(value)}</span>
        <span className={styles.label} slot="end">{toTime(max)}</span>
      </IonRange>
  )
}

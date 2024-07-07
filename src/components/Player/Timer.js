import React, { useEffect, useMemo, useState } from 'react'
import { IonRange } from '@ionic/react'
import { BsStopFill } from 'react-icons/bs'

import styles from './RangeOption.module.css'

const padTime = (time = 0) => String(time).padStart(2, '0')

const toTime = (minutes = 0) => {
  let hour, minute, remain = minutes
  if (remain > 60) {
    hour = Math.floor(remain / 60)
    remain = remain - hour * 60
  }
  minute = Math.floor(remain)
  return `${padTime(hour)}时${padTime(minute)}分`
}

export default function Timer({
  focusing,
  onChange,
  onFocus,
  onTimeout,
  value: { at, minutes = 0, } = {},
}) {
  const [tick, setTick] = useState(0)
  const remain = useMemo(() => {
    return at && minutes ? minutes - Math.floor((Date.now() - at) / 60000) : undefined
  }, [tick])

  useEffect(() => {
    if (focusing && minutes && !at) onChange({ at: Date.now(), minutes })
  }, [focusing])
  useEffect(() => {
    if (remain === undefined || remain > 0) return
    onTimeout()
    onChange({ minutes })
  }, [remain])
  useEffect(() => {
    let timeoutId
    const trigger = () => {
      setTick((t) => t + 1)
      timeoutId = setTimeout(trigger, 1000)
    }
    trigger()
    return () => clearTimeout(timeoutId)
  }, [])

  if (!focusing) return (
      <span className={styles.label} onClick={onFocus}>
        {remain ? <><BsStopFill className={styles.icon} />{toTime(remain)}</> : '定时关闭'}
      </span>
  )
  return (
      <IonRange
        max={180}
        min={0}
        mode="ios"
        onIonChange={({ detail }) => onChange({ at: Date.now(), minutes: detail.value })}
        onIonInput={({ detail }) => onChange({ minutes: detail.value })}
        value={minutes}
      >
        <span className={styles.icon} slot="start" title="停止"><BsStopFill /></span>
        <span className={styles.label} slot="end">{toTime(minutes)}</span>
      </IonRange>
  )
}

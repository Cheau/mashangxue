import React from 'react'
import { IonRange } from '@ionic/react'
import { BsX } from 'react-icons/bs'

import styles from './RangeOption.module.css'

export default function Rate({
  focusing,
  onChange,
  onFocus,
  value,
}) {
  if (!focusing) return (
      <span className={styles.label} onClick={onFocus}>
        {value === 1 ? '倍速播放' : <><BsX className={styles.icon} />{value}</>}
      </span>
  )
  return (
    <IonRange
      max={2}
      min={0.5}
      mode="ios"
      onIonInput={({ detail }) => onChange(detail.value)}
      snaps
      step={0.1}
      ticks
      value={value}
    >
      <span className={styles.icon} slot="start" title="倍速"><BsX /></span>
      <span className={styles.label} slot="end" style={{ width: '32px' }}>
        {Number.isInteger(value) ? `${value}.0` : value}
      </span>
    </IonRange>
  )
}

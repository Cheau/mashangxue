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
        {value === 1 ? '倍速' : <><BsX className={styles.icon} />{value}</>}
      </span>
  )
  return (
    <IonRange
      max={2}
      min={0.5}
      mode="ios"
      onIonInput={({ detail }) => onChange(detail.value)}
      step={0.1}
      value={value}
    >
      <span className={styles.icon} slot="start"><BsX /></span>
      <span className={styles.label} slot="end" style={{ width: '32px' }}>{value === 1 ? '1.0' : value}</span>
    </IonRange>
  )
}

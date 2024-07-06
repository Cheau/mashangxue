import React from 'react'
import { IonRange } from '@ionic/react'
import {
  BiVolume,
  BiVolumeFull,
  BiVolumeLow,
  BiVolumeMute,
} from 'react-icons/bi'

import styles from './RangeOption.module.css'

const getIcon = (mute, volume) => {
  if (mute || volume === 0) return BiVolumeMute
  if (volume === 100) return BiVolumeFull
  return volume < 50 ? BiVolume : BiVolumeLow
}

export default function Volume({
  focusing,
  mute = false,
  onFocus,
  onMute = () => {},
  onVolume = () => {},
  value = 100,
}) {
  const Icon = getIcon(mute, value)
  const setVolume = (v) => {
    if (mute) onMute(false)
    onVolume(v)
  }
  if (!focusing) return (
    <span className={styles.label} onClick={onFocus}>
      {value === 100 ? '音量' : <><Icon className={styles.icon} />{value}</>}
    </span>
  )
  return (
    <IonRange
        mode="ios"
        onIonInput={({ detail }) => setVolume(detail.value)}
        value={value}
    >
      <span className={styles.icon} slot="start" onClick={() => onMute(!mute)} title="切换静音"><Icon /></span>
      <span className={styles.label} slot="end">{value}</span>
    </IonRange>
  )
}

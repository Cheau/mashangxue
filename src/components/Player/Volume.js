import React from 'react'
import { IonRange } from '@ionic/react'
import {
  BiVolume,
  BiVolumeFull,
  BiVolumeLow,
  BiVolumeMute,
} from 'react-icons/bi'

import styles from './Volume.module.css'

const getIcon = (mute, volume) => {
  if (mute || volume === 0) return BiVolumeMute
  if (volume === 100) return BiVolumeFull
  return volume < 50 ? BiVolume : BiVolumeLow
}

export default function Volume({
  mute = false,
  onMute = () => {},
  onVolume = () => {},
  value = 100,
}) {
  const Icon = getIcon(mute, value)
  const setVolume = (v) => {
    if (mute) onMute(false)
    onVolume(v)
  }
  return (
    <IonRange onIonInput={({ detail }) => setVolume(detail.value)} value={value}>
      <span className={styles.icon} slot="start" onClick={() => onMute(!mute)} title="切换静音"><Icon /></span>
      <span className={styles.label} slot="end">{value}</span>
    </IonRange>
  )
}

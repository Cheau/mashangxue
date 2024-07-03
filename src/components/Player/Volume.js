import React from 'react'
import { IonRange } from '@ionic/react'
import {
  BiVolume,
  BiVolumeFull,
  BiVolumeLow,
  BiVolumeMute,
} from 'react-icons/bi'

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
  return (
    <IonRange onIonInput={({ detail }) => onVolume(detail.value)} value={value}>
      <span slot="start" onClick={() => onMute(!mute)} title="切换静音"><Icon /></span>
      <span slot="end">{value}</span>
    </IonRange>
  )
}
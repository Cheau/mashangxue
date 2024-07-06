import React from 'react'

import { IonRange } from '@ionic/react'

export default function Rate({
  focusing, onChange, onFocus, value,
}) {
  const label = value === 1 ? '倍速' : `${value}x`
  if (!focusing) return <span onClick={onFocus}>{label}</span>
  return (
    <IonRange
      max={1.5}
      min={0.5}
      mode="ios"
      onIonInput={({ detail }) => onChange(detail.value)}
      snaps={true}
      step={0.1}
      ticks={true}
      value={value}
    >
      <span slot="start">倍速</span>
      <span slot="end" style={{ width: '32px' }}>{value === 1 ? '1.0' : value}x</span>
    </IonRange>
  )
}

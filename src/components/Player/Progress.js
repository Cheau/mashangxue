import React, { useEffect, useState } from 'react'
import { IonRange } from '@ionic/react'

import './Progress.module.css'

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
  const [knob, setKnob] = useState()
  useEffect(() => {
    if (value === knob) setKnob(undefined)
  }, [value])
  return (
      <IonRange
          max={max} mode="md"
          onIonChange={() => onChange(knob)}
          onIonFocus={() => setKnob(value)}
          onIonInput={({ detail }) => setKnob(detail.value)}
          pin
          pinFormatter={toTime}
          value={knob ?? value}
      >
        <span slot="start">{toTime(value)}</span>
        <span slot="end">{toTime(max)}</span>
      </IonRange>
  )
}

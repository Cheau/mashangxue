import React, { useMemo } from 'react'
import { IonRange } from '@ionic/react'

import { hoursToDozens, dozensToTime, timeToDozens } from './utils'

export default function RangePicker(props) {
  const {
    max = 24, min = 0, onChange, value: [start, end]
  } = props
  const maxInDozens = useMemo(() => hoursToDozens(max), [max])
  const minInDozens = useMemo(() => hoursToDozens(min), [min])
  const value = { lower: timeToDozens(start), upper: timeToDozens(end) }
  const change = (e) => {
    const { lower, upper } = e.detail.value
    onChange([dozensToTime(lower), dozensToTime(upper)])
  }
  return (
    <IonRange
      dualKnobs
      max={maxInDozens}
      min={minInDozens}
      onIonChange={change}
      pin
      pinFormatter={dozensToTime}
      value={value}
    >
      <span slot="start">{min}</span>
      <span slot="end">{max}</span>
    </IonRange>
  )
}

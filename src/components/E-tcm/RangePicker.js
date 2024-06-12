import React from 'react'
import { IonPicker, IonPickerColumn, IonPickerColumnOption } from '@ionic/react'

import './RangePicker.module.css'
import { padTime } from './utils'

const options = (count) => Array(count).fill().map((v, i) => {
  const value = padTime(i)
  return (
    <IonPickerColumnOption key={i} value={value}>
      {value}
    </IonPickerColumnOption>
)})

export default function RangePicker(props) {
  const {
    max = 24, min = 0, onChange, value: [start, end]
  } = props
  const [startHour, startMinute] = start.split(':')
  const [endHour, endMinute] = end.split(':')
  const change = (i) => ({ detail }) => {
    const { value } = detail
    const values = [startHour, startMinute, endHour, endMinute]
    values[i] = value
    onChange([`${values[0]}:${values[1]}`, `${values[2]}:${values[3]}`])
  }
  return (
    <IonPicker>
      <IonPickerColumn onIonChange={change(0)} value={startHour}>
        {options(24)}
        <div slot="suffix">:</div>
      </IonPickerColumn>
      <IonPickerColumn onIonChange={change(1)} value={startMinute}>
        {options(60)}
        <div slot="suffix">~</div>
      </IonPickerColumn>
      <IonPickerColumn onIonChange={change(2)} value={endHour}>
        {options(24)}
        <div slot="suffix">:</div>
      </IonPickerColumn>
      <IonPickerColumn  onIonChange={change(3)} value={endMinute}>
        {options(60)}
      </IonPickerColumn>
    </IonPicker>
  )
}

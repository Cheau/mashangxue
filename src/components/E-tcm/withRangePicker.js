import React, { useRef, useState } from 'react'
import {
  IonButton,
  IonPicker,
  IonPickerColumn,
  IonPickerColumnOption,
  IonPopover,
  IonToolbar,
} from '@ionic/react'

import './withRangePicker.module.css'
import { padTime } from './utils'

const now = () => {
  const date = new Date()
  const time = `${padTime(date.getHours())}:00`
  return [time, time]
}

const split = (range) => {
  const [start, end] = range
  const [sHour, sMinute] = start.split(':')
  const [eHour, eMinute] = end.split(':')
  return [sHour, sMinute, eHour, eMinute]
}

const options = (max, min = 0) => Array(max - min + 1).fill().map((v, i) => {
  const value = padTime(min + i)
  return (
    <IonPickerColumnOption key={i} value={value}>
      {value}
    </IonPickerColumnOption>
)})

const withRangePicker = (Component) => function RangePicker({
  max = 24,
  min = 0,
  onChange = () => {},
  value = now(),
  ...rest
}) {
  const popover = useRef(null)
  const [open, setOpen] = useState(false)
  const onPop = (e) => {
    setOpen(true)
    popover.current.event = e
  }
  const onDismiss = () => setOpen(false)

  const [range, setRange] = useState(() => split(value))
  const [sHour, sMinute, eHour, eMinute] = range
  const onPick = (e, i) => {
    const newRange = [...range]
    newRange[i] = e.detail.value
    setRange(newRange)
  }
  const onOk = () => {
    const newStart = `${sHour}:${sMinute}`
    const newEnd = `${eHour}:${eMinute}`
    const newValue = newEnd < newStart ? [newEnd, newStart] : [newStart, newEnd]
    onChange(newValue)
    onDismiss()
  }
  return (
    <>
      <Component {...rest} onClick={onPop} />
      <IonPopover isOpen={open} mode="ios" onDidDismiss={onDismiss} ref={popover}>
        <IonPicker>
          <IonPickerColumn onIonChange={(e) => onPick(e, 0)} value={sHour}>
            {options(max, min)}
            <div slot="suffix">:</div>
          </IonPickerColumn>
          <IonPickerColumn onIonChange={(e) => onPick(e, 1)} value={sMinute}>
            {options(59)}
            <div slot="suffix">~</div>
          </IonPickerColumn>
          <IonPickerColumn onIonChange={(e) => onPick(e, 2)} value={eHour}>
            {options(max, min)}
            <div slot="suffix">:</div>
          </IonPickerColumn>
          <IonPickerColumn  onIonChange={(e) => onPick(e, 3)} value={eMinute}>
            {options(59)}
          </IonPickerColumn>
        </IonPicker>
        <IonToolbar>
          <IonButton fill="clear" size="small" slot="end" onClick={onOk}>
            确定
          </IonButton>
        </IonToolbar>
      </IonPopover>
    </>
  )
}

export default withRangePicker

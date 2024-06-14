import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
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

const split = (range = now()) => {
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
  value,
  ...rest
}) {
  const popover = useRef(null)
  const [open, setOpen] = useState(false)
  const [range, setRange] = useState(() => split(value))
  const columns = useMemo(() => [
      { max, min, suffix: ':' },
      { max: 59, suffix: '~' },
      { max, min, suffix: ':' },
      { max: 59 },
  ], [max, min])
  useEffect(() => setRange(split(value)), [value])

  const onPop = (e) => {
    setOpen(true)
    popover.current.event = e
  }
  const onDismiss = () => {
    setOpen(false)
    setRange(split(value))
  }
  const onPick = (e, i) => {
    const newRange = [...range]
    newRange[i] = e.detail.value
    setRange(newRange)
  }
  const onOk = () => {
    const start = `${range[0]}:${range[1]}`
    const end = `${range[2]}:${range[3]}`
    const ordered = end < start ? [end, start] : [start, end]
    setRange(split(ordered))
    onChange(ordered)
    onDismiss()
  }
  return (
    <>
      <Component {...rest} onClick={onPop} />
      <IonPopover isOpen={open} mode="ios" onDidDismiss={onDismiss} ref={popover}>
        <IonPicker>
          {columns.map((column, i) => (
              <IonPickerColumn key={i} onIonChange={(e) => onPick(e, i)} value={range[i]}>
                {options(column.max, column.min)}
                {column.suffix && <div slot="suffix">{column.suffix}</div>}
              </IonPickerColumn>
          ))}
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

import React, { useState } from 'react'
import { BsPlusLg } from 'react-icons/bs'
import {
  Button,
  DateRangePicker,
} from 'rsuite'

import 'rsuite/Button/styles/index.css'
import 'rsuite/DateRangePicker/styles/index.css'

import styles from './RangeAdder.module.css'
import { padTime } from './utils'

const format = (date) => `${padTime(date.getHours())}:${padTime(date.getMinutes())}`

export default function RangeAdder({ children, onChange }) {
  const [typing, setTyping] = useState(false)
  const change = (value) => {
    setTyping(false)
    if (!value) return
    const [start, end] = value
    onChange([format(start), format(end)])
  }
  if (typing) {
    return (
        <DateRangePicker
            block
            className={styles.picker}
            defaultOpen={true}
            format="HH:mm"
            showHeader={false}
            onClean={() => change()}
            onOk={change}
            preventOverflow
            ranges={[]}
            size="sm"
            value={[new Date(), new Date()]}
        />
    )
  }
  return (
    <div className={styles.wrapper}>
      <Button
          appearance="ghost"
          block
          className={styles.button}
          onClick={() => setTyping(true)}
          size="sm"
          startIcon={<BsPlusLg />}
      >
        {children}
      </Button>
    </div>
  )
}

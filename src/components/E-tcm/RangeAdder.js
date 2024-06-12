import React, { useState } from 'react'
import { BsPlusLg } from 'react-icons/bs'
import { IonButton, IonPopover, IonToolbar } from '@ionic/react'

import styles from './RangeAdder.module.css'
import RangePicker from './RangePicker'

export default function RangeAdder({ children, onChange }) {
  const [typing, setTyping] = useState(false)
  const [value, setValue] = useState()
  const onOk = () => {
    setTyping(false)
    onChange(value)
  }
  return (
    <div className={styles.wrapper}>
      <IonButton color="primary" expand="block" fill="outline" onClick={() => setTyping(true)}>
        <BsPlusLg style={{ marginRight: '5px' }} />{children}
      </IonButton>
      <IonPopover isOpen={typing} mode="ios" onDidDismiss={() => setTyping(false)}>
        <RangePicker onChange={setValue} value={value} />
        <IonToolbar>
          <IonButton fill="clear" size="small" slot="end" onClick={onOk}>确定</IonButton>
        </IonToolbar>
      </IonPopover>
    </div>
  )
}

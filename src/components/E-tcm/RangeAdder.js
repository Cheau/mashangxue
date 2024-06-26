import React from 'react'
import { BsPlusLg } from 'react-icons/bs'
import { IonButton } from '@ionic/react'

import styles from './RangeAdder.module.css'
import withRangePicker from './withRangePicker'

export default withRangePicker(function RangeAdder({ children, ...rest }) {
  return (
    <IonButton
      className={styles.adder}
      color="primary"
      expand="block"
      fill="clear"
      size="default"
      {...rest}
    >
      <BsPlusLg style={{ marginRight: '5px' }} />{children}
    </IonButton>
  )
})

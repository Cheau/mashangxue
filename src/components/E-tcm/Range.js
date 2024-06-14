import React from 'react'
import clsx from 'clsx'
import { BsClockHistory, BsXLg } from 'react-icons/bs'
import { IonChip, IonLabel } from '@ionic/react'

import styles from './Range.module.css'
import withRangePicker from './withRangePicker'
import { formatRange } from './utils'
import { halt } from '../../common/event'

export default withRangePicker(function Range({
  active = false,
  children,
  deletable = false,
  onDelete = () => {},
  ...rest
}) {
  return (
    <IonChip className={clsx(styles.range, { [styles.active]: active })} color="medium" {...rest}>
        <BsClockHistory />
        <IonLabel>{formatRange(children)}</IonLabel>
        {deletable && <BsXLg onClick={halt(onDelete)} />}
    </IonChip>
  )
})

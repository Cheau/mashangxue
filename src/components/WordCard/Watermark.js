import React from 'react'
import clsx from 'clsx'

import styles from './Watermark.module.css'
import { Account, Topic } from './IconText'

export default function Watermark({ topic }) {
  return (
    <div className={clsx('watermark', styles.watermark)}>
      <Topic>{topic}</Topic>
      <Account />
    </div>
  )
}
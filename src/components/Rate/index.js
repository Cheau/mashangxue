import React from 'react'
import { FaStar } from 'react-icons/fa'

import styles from './styles.module.css'

export default function Rate({
  Icon = FaStar,
  max = 5,
  value = 1,
  ...rest
}) {
  const points = new Array(Math.min(value, max)).fill(0).map((value, index) => <Icon key={index} />)
  return <div className={styles.rate} {...rest}>{points}</div>
}

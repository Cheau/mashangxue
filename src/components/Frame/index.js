import React from 'react'

import styles from './styles.module.css'
import Ribbon from '../Ribbon'

export default function frame({ ratio = 9 / 16, ribbon, ...rest }) {
  return (
      <div className={styles.frame} style={{ paddingTop: `${ratio * 100}%` }}>
        <div className={styles.full}>
          <iframe {...rest} />
          <Ribbon>{ribbon}</Ribbon>
        </div>
      </div>
  )
}

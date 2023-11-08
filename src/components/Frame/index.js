import React from 'react'

import styles from './styles.module.css'
import Ribbon from '../Ribbon'

export default function frame({
    allowFullScreen = true,
    ratio = 9 / 16,
    ribbon,
    src,
    style = { border: 'none', overflow: 'hidden' },
    ...rest
}) {
  return (
      <div className={styles.frame} style={{ paddingTop: `${ratio * 100}%` }}>
        <div className={styles.full}>
          <iframe
            allowFullScreen={allowFullScreen}
            src={src}
            style={style}
            {...rest}
          />
          <Ribbon.Corner>{ribbon}</Ribbon.Corner>
        </div>
      </div>
  )
}

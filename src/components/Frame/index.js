import React from 'react'

import styles from './styles.module.css'
import Ribbon from '../Ribbon'

export default function frame({
    allowfullscreen,
    frameborder,
    ratio = 9 / 16,
    ribbon,
    ...rest
}) {
  return (
      <div className={styles.frame} style={{ paddingTop: `${ratio * 100}%` }}>
        <div className={styles.full}>
          <iframe allowFullScreen={Boolean(allowfullscreen)} frameBorder={frameborder} {...rest} />
          <Ribbon.Corner>{ribbon}</Ribbon.Corner>
        </div>
      </div>
  )
}

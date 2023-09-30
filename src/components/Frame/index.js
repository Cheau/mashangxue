import React from 'react'

import styles from './styles.module.css'

export default function frame({ ratio = 9 / 16, ...rest }) {
  return (
      <div className={styles.frame} style={{ paddingTop: `${ratio * 100}%` }}>
        <div className={styles.full}>
          <iframe {...rest} />
        </div>
      </div>
  )
}

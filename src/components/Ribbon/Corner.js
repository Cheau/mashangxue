import React from 'react'

import styles from './Corner.module.css'

export default function Corner({ children }) {
  return children ? <div className={styles.corner}>{children}</div> : null
}

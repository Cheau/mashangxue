import React from 'react'

import styles from './styles.module.css'

export default function Ribbon({ children }) {
  return children ? <div className={styles.ribbon}>{children}</div> : null
}

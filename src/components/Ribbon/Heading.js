import React from 'react'

import styles from './Heading.module.css'

export default function Heading({ children, style }) {
  return (
    <div className={styles.heading} style={style}>
      <div className={styles.before} />
      <div className={styles.text}>{children}</div>
      <div className={styles.after} />
    </div>
  )
}
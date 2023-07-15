import React from 'react'

import styles from './styles.module.css'
import Word from '.'

export default function Lookup(props) {
  return (
      <div className={styles.lookup}>
        <Word {...props} />
      </div>
  )
}

import React, { useContext } from 'react'

import styles from './styles.module.css'
import { Context } from './withProviders'

export default function MeaningCard() {
  const { meaning } = useContext(Context)
  return <div className={styles.groups}>{meaning}</div>
}

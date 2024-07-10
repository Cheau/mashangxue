import React from 'react'

import styles from './Icon.module.css'

export default function Icon({ Component }) {
  return <Component className={styles.icon} />
}

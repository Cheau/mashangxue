import React from 'react'
import clsx from 'clsx'

import styles from './feature.module.css'

export default function Feature({ icon, title, subtitle }) {
  return (
      <div className={clsx('feature', styles.feature)}>
        <div className={clsx('icon', styles.icon)}>{icon}</div>
        <div className={clsx('content', styles.content)}>
          <div className={clsx('title', styles.title)}>{title}</div>
          <div className={clsx('subtitle', styles.subtitle)}>{subtitle}</div>
        </div>
      </div>
  )
}

import React from 'react'

import styles from './styles.module.css'

export default function Game({
   children,
   intro,
   subtitle,
   title,
}) {
  return (
      <div>
        <div className={styles.title}>
          {title}
          {subtitle ? <span className={styles.subtitle}>{subtitle}</span> : null}
        </div>
        {intro ? <div className={styles.intro}>{intro}</div> : null}
        {children}
      </div>
  )
}

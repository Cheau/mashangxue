import React from 'react'

import data from './data'
import styles from './landscape.module.css'
import Feature from './Feature'

export default function Landscape() {
  const features = data.map((datum, i) => <Feature key={i} {...datum} />)
  return (
      <div className={styles.background}>
        <div className="container" style={{ overflow: 'hidden' }}>
          <div className={styles.landscape}>
            <div className={styles.primary}>
              {features}
            </div>
            <div className={styles.secondary}>
              {features}
            </div>
          </div>
        </div>
      </div>
  )
}

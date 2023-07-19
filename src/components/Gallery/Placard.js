import React from 'react'

import styles from './styles.module.css'

export default function Placard(props) {
  const {
     attr, badge, channel, desc, image, link, ratio = 1, title,
  } = props
  return (
      <div className={styles.placard} style={{ paddingTop: `${ratio * 100}%` }}>
        <div className={styles.full}>
          <div className={styles.container} onClick={() => window.location.href = link}>
            <img src={image} alt={title} />
            <div className={styles.pill}>{title}</div>
            <div className={styles.ribbon}>{badge}</div>
            <div className={styles.mask}>
              <div className={styles.desc}>{desc}</div>
              <div className={styles.footer}>{channel}</div>
            </div>
          </div>
          <div className={styles.attribution} dangerouslySetInnerHTML={{ __html: attr }} />
        </div>
      </div>
  )
}
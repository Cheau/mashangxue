import React from 'react'

import styles from './styles.module.css'

export default function Placard(props) {
  const {
     attr, channel, desc, image, link, ratio = 1, title,
  } = props
  return (
      <div className={styles.placard} style={{ paddingTop: `${ratio * 100}%` }}>
        <div className={styles.full}>
          <div className={styles.container} onClick={() => window.location.href = link}>
            <img src={image} alt={title} />
            <div className={styles.channel}>{channel}</div>
            <div className={styles.main}>
              <div className={styles.title}>{title}</div>
              <div className={styles.desc}>{desc}</div>
            </div>
          </div>
          <div className={styles.attribution} dangerouslySetInnerHTML={{ __html: attr }} />
        </div>
      </div>
  )
}

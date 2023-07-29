import React from 'react'
import { FcOk, FcBookmark } from 'react-icons/fc'

import styles from './styles.module.css'
import Image from '../Image'

export default function Placard(props) {
  const {
     badge, channel, desc, image, link, title,
  } = props
  return (
      <div className={styles.placard}>
        <Image rounded shadowed
            alt={title}
            src={image}
            onClick={() => window.location.href = link}
        >
          <div className={styles.pill}>{title}</div>
          <div className={styles.ribbon}>{badge}</div>
          <div className={styles.mask}>
            <div className={styles.desc}>
              <span className={styles.icon}><FcOk /></span>{desc}</div>
            <div className={styles.footer}>
              <span className={styles.icon}><FcBookmark /></span>{channel}</div>
          </div>
        </Image>
      </div>
  )
}

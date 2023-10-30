import React from 'react'
import clsx from 'clsx'
import { FcOk, FcBookmark } from 'react-icons/fc'

import styles from './styles.module.css'
import Image from '../Image'

export default function Placard(props) {
  const {
     badge, bg, channel, desc, link, title, x, y,
  } = props
  const imageSrc = /(?<=\/docs).+/.exec(link)[0]
  return (
      <div className={styles.placard}>
        <Image rounded shadowed
            alt={title}
            background={bg}
            left={x}
            ribbon={badge}
            src={imageSrc}
            onClick={() => window.location.href = link}
            top={y}
        >
          <div className={clsx(styles.pill, styles.blur)}>{title}</div>
          <div className={clsx(styles.mask, styles.blur)}>
            <div className={styles.desc}>
              <span className={styles.icon}><FcOk /></span>
              {desc}
            </div>
            <div className={styles.footer}>
              <span className={styles.icon}><FcBookmark /></span>
              {channel}
            </div>
          </div>
        </Image>
      </div>
  )
}

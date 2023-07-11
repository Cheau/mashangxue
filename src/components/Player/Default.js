import React from 'react'
import { BiCaretRight, BiPause, BiVolumeFull } from 'react-icons/bi'

import styles from './styles.module.css'

export default function Default(props) {
  const {
    badge, children, hovering, src, status, ...rest
  } = props
  let icon
  if (src) {
    if (status === 'playing') {
      icon = <BiPause/>
    } else if (status === 'paused') icon = <BiCaretRight/>
    else if (hovering) icon = <BiVolumeFull/>
  }
  return (
      <div className={styles.block} {...rest}>
        <span style={{ visibility: icon ? 'hidden' : 'visible' }}>{children}</span>
        <div className={styles.icon}>{icon}</div>
        {badge}
      </div>
  )
}

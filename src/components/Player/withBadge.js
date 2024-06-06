import React from 'react'
import { BiStop } from 'react-icons/bi'

import styles from './styles.module.css'

const withBadge = (Component) => (props) => {
  const { actions: { stop }, badge, status } = props
  const Badge = badge || status === 'playing' || status === 'paused' ? (
    <span className={styles.badge} onClick={stop}>
      {badge ?? <BiStop/>}
    </span>
  ) : null
  return <Component {...props} badge={Badge} />
}

export default withBadge

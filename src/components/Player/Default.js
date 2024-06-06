import React from 'react'
import { BiPause, BiPlay, BiVolumeFull } from 'react-icons/bi'

import styles from './styles.module.css'
import withBadge from './withBadge'
import withHover from './withHover'
import withPlayer from './withPlayer'

function Default(props) {
  const {
    actions: { pause, play },
    badge, children, hovering, src, status, ...rest
  } = props
  let icon
  if (src) {
    if (status === 'playing') {
      icon = <BiPause/>
    } else if (status === 'paused') icon = <BiPlay/>
    else if (hovering) icon = <BiVolumeFull/>
  }
  const onClick = status === 'playing' ? pause : play
  return (
      <div className={styles.block} onClick={onClick} {...rest}>
        <span style={{ visibility: icon ? 'hidden' : 'visible' }}>{children}</span>
        <div className={styles.icon}>{icon}</div>
        {badge}
      </div>
  )
}

export default withPlayer(withBadge(withHover(Default)))

import React, { useMemo, useState } from 'react'
import { Howl } from 'howler'
import { BiStop } from 'react-icons/bi'

import styles from './styles.module.css'
import Button from './Button'
import Default from './Default'
import Square from './Square'

const getSound = (src, setStatus) => {
  if (!src) return undefined
  const sound = new Howl({ src, preload: false })
  sound
      .on('play', () => setStatus('playing'))
      .on('pause',() => setStatus('paused'))
      .on('stop',() => setStatus('stopped'))
      .on('end',() => setStatus('ended'))
  return sound
}

const withPlayer = (Component) => (props) => {
  const {
    badge, children, src, style, ...rest
  } = props
  const [hovering, setHovering] = useState()
  const [status, setStatus] = useState()
  const sound = useMemo(() => getSound(src, setStatus), [src])
  const onToggle = () => {
    if (!src) return
    if (sound.state() === 'unloaded') sound.load()
    if (status === 'playing') sound.pause()
    else sound.play()
  }
  const onStop = (e) => {
    if (!src) return
    e.stopPropagation()
    sound.stop()
    setHovering(false)
  }
  const Badge = badge || status === 'playing' || status === 'paused' ? (
      <span className={styles.badge} onClick={onStop}>
              {badge ?? <BiStop />}
            </span>
  ) : null
  return <Component
      badge={Badge}
      hovering={hovering}
      onClick={onToggle}
      onMouseLeave={() => setHovering(false)}
      onMouseOver={() => setHovering(true)}
      onStop={onStop}
      status={status}
      style={{
        visibility: children ? 'visible' : 'hidden',
        ...style,
      }}
      {...rest}
  >{children}</Component>
}

const Players = {
  default: withPlayer(Default),
  button: withPlayer(Button),
  square: withPlayer(Square),
}

export default function Player(props) {
  const { appearance = 'default' } = props
  const Player = Players[appearance]
  return <Player {...props} />
}

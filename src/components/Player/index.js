import React, { useMemo, useState } from 'react'
import { Howl } from 'howler'
import {
  BiCaretRight,
  BiPause,
  BiStop,
  BiVolumeFull,
} from 'react-icons/bi'

import styles from './styles.module.css'

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

function Button(props) {
  return <Block {...props} />
}

function Block(props) {
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
  let icon
  if (src) {
    if (status === 'playing') {
      icon = <BiPause/>
    } else if (status === 'paused') icon = <BiCaretRight/>
    else if (hovering) icon = <BiVolumeFull/>
  }
  return (
      <div
          className={styles.block}
          onClick={onToggle}
          onMouseLeave={() => setHovering(false)}
          onMouseOver={() => setHovering(true)}
          style={{
            visibility: children ? 'visible' : 'hidden',
            ...style,
          }}
          {...rest}
      >
        <span style={{ visibility: icon ? 'hidden' : 'visible' }}>{children}</span>
        <div className={styles.icon}>{icon}</div>
        {badge || status === 'playing' || status === 'paused' ? (
            <span className={styles.badge} onClick={onStop}>
              {badge ?? <BiStop />}
            </span>
        ) : null}
      </div>
  )
}

function Square(props) {
  const { style, ...rest } = props
  const squareStyle = {
    height: '2em',
    width: '2em',
    lineHeight: '2em',
    padding: 0,
    ...style,
  }
  return <Block {...rest} style={squareStyle} />
}

const Players = {
  block: Block,
  button: Button,
  square: Square,
}

export default function Player(props) {
  const { appearance = 'block' } = props
  const StyledPlayer = Players[appearance]
  return <StyledPlayer {...props} />
}

import React from 'react'
import { FaRegHandPointLeft, FaRegHandPointRight } from 'react-icons/fa'

import styles from './styles.module.css'
import Highlight from '../Highlight'

const delimiter = /(?<!\\):/

const escape = (str = '') => str.replace(/\\:/g, ':')

export default function Bubble(props) {
  const {
    children, right = false, tabIndex, ...rest
  } = props
  const side = right ? 'right' : 'left'
  const [speech, hint] = typeof children === 'string' ? children.split(delimiter) : []
  const Pointer = right ? FaRegHandPointRight : FaRegHandPointLeft
  return (
      <div style={{ fontSize: '32px', marginBottom: '10px', position: 'relative', textAlign: side }}>
        <div className={styles[`bubble-${side}`]} tabIndex={tabIndex} style={rest}>
          {escape(speech) || children}
          <span className={styles[`pointer-${side}`]}><Pointer /></span>
        </div>
        <div className={styles[`hint-${side}`]}>{escape(hint || props.hint)}</div>
      </div>
  )
}

function BubbleNote(props) {
  const {
    children, side, green = false, yellow = false, ...rest
  } = props
  const [title, hint] = typeof children === 'string' ? children.split(delimiter) : []
  const bc = green ? 'green' : (yellow ? 'yellow' : undefined)
  return (
      <div style={{ fontSize: '32px', ...rest }}>
        <div className={styles[`note-${side}`]}>
          <Highlight {...{[bc]: true}}>{escape(title) || children}</Highlight>
        </div>
        <p className={styles[`hint-${side}`]}>{escape(hint || props.hint)}</p>
      </div>
  )
}

export function BubbleLeftNote(props) {
  return <BubbleNote {...props} side="left" />
}

export function BubbleRightNote(props) {
  return <BubbleNote {...props} side="right" />
}

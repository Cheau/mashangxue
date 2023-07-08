import React from 'react'

import styles from './styles.module.css'
import Player from '../Player'

function getAlphabet({ letterCase, sound, states = Array(26).fill({}) }) {
  return states
      .map(({ color, count }, i) => {
        const upper = letterCase !== 'lower' ? String.fromCharCode(65 + i) : null
        const lower = letterCase !== 'upper' ? String.fromCharCode(97 + i) : null
        const text = `${upper ?? ''}${lower ?? ''}`
        const src = sound ? `/audio/alphabet/${upper}.mp3` : undefined
        const style = {
          cursor: sound ? 'pointer' : 'default'
        }
        return <Player
            key={i}
            appearance="square"
            badge={count > 0 ? count : null}
            src={src}
            style={style}
        >
          {text}
        </Player>
      })
}

export default function Alphabet(props) {
  const { alphabet = getAlphabet(props) } = props
  alphabet.splice(17, 0, <Player key="l1" />)
  alphabet.splice(24, 0, <Player key="l2" />)
  return (
      <>
        <div className={styles.row}>
          {alphabet.slice(0, 7)}
        </div>
        <div className={styles.row}>
          {alphabet.slice(7, 14)}
        </div>
        <div className={styles.row}>
          {alphabet.slice(14, 21)}
        </div>
        <div className={styles.row}>
          {alphabet.slice(21, 28)}
        </div>
      </>
  )
}

import React from 'react'

import styles from './styles.module.css'
import Phonetics from './Phonetics'

export default function CompletedCard({ children, data, highlight }) {
  const [word] = children.split('/')
  const groups = Object.entries(data.meanings).map(([abbr, meanings]) => (
      <div key={abbr} className={styles.meanings}>
        <div className={styles.pos}>{abbr}</div>
        {meanings.map((m, i) => <div key={`${abbr}-${i}`}>{i + 1}. {m.definition}</div>)}
      </div>
  ))
  return (
      <div className={styles.card}>
        <span className={styles.title} style={{ background: highlight }}>{word}</span>
        <Phonetics phonetics={data.phonetics} />
        {groups}
      </div>
  )
}

import React from 'react'

import styles from './styles.module.css'
import Phonetics from './Phonetics'

export default function CompletedCard({ data }) {
  const groups = Object.entries(data.meanings).map(([abbr, meanings]) => (
      <div key={abbr} className={styles.meanings}>
        <div className={styles.pos}>{abbr}</div>
        {meanings.map((m, i) => <div key={`${abbr}-${i}`}>{i + 1}. {m.definition}</div>)}
      </div>
  ))
  return (
      <>
        <Phonetics phonetics={data.phonetics} />
        {groups}
      </>
  )
}

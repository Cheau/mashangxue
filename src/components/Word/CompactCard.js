import React from 'react'

import styles from './styles.module.css'
import Phonetics from './Phonetics'

export default function CompactCard({ children, data }) {
  const [, partOfSpeech, defIndex = 1] = children.split('/')
  const { phonetics, meanings } = data
  const meaning = meanings[partOfSpeech]
  const { definition } = meaning[defIndex - 1]
  return (
      <>
        <Phonetics phonetics={phonetics} />
        <div className={styles.pos}>{partOfSpeech}</div>
        <div>{definition}</div>
      </>
  )
}

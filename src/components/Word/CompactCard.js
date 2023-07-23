import React, { useContext } from 'react'

import styles from './styles.module.css'
import { DataContext, WordContext } from './withProviders'

export default function CompactCard() {
  const { data } = useContext(DataContext)
  const { partOfSpeech, defIndex } = useContext(WordContext)
  const { meanings } = data
  const meaning = meanings[partOfSpeech]
  const { definition } = meaning[defIndex - 1]
  return (
      <>
        <div className={styles.groups}>
          <div className={styles.pos}>{partOfSpeech}</div>
          {definition}
        </div>
      </>
  )
}

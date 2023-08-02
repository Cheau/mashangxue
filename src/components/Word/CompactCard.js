import React, { useContext } from 'react'

import styles from './styles.module.css'
import { Context } from './withProviders'

export default function CompactCard() {
  const { data, partOfSpeech, defIndex } = useContext(Context)
  const { meanings } = data
  const meaning = meanings[partOfSpeech]
  const { definition } = meaning[defIndex - 1]
  return (
      <>
        <div className={styles.groups}>
          <span className={styles.pos}>{partOfSpeech}</span>
          {definition}
        </div>
      </>
  )
}

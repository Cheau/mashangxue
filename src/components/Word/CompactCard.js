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
          <div className={styles.pos}>{partOfSpeech}</div>
          {definition}
        </div>
      </>
  )
}

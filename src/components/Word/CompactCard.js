import React from 'react'

import styles from './styles.module.css'

export default function CompactCard({ children, data }) {
  const [, partOfSpeech, defIndex = 1] = children.split('/')
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

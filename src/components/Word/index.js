import React, { useEffect, useState } from 'react'

import styles from './styles.module.css'
import { abbreviate } from './PartOfSpeech'
import { colors } from '../Highlight'
import CompactCard from './CompactCard'
import CompletedCard from './CompletedCard'
import SkeletonCard from './SkeletonCard'
import Toggle from './Toggle'

function reduce(data) {
  let phonetics = {}
  const meanings = {}
  data.forEach((datum) => {
    datum.phonetics.forEach(({ audio, text }) => {
      if (audio) phonetics[audio] = text
    })
    datum.meanings.forEach(({ partOfSpeech, definitions }) => {
      const abbr = abbreviate(partOfSpeech)
      if (!meanings[abbr]) meanings[abbr] = []
      meanings[abbr] = meanings[abbr].concat(definitions)
    })
  })
  phonetics = Object.entries(phonetics).map(([audio, text]) => ({ audio, text }))
  return { phonetics, meanings }
}

export default function Word({ children, index }) {
  const [word, partOfSpeech, defIndex = 1] = children.split('/')
  const [data, setData] = useState()
  const [compact, setCompact] = useState(!!partOfSpeech)
  useEffect(async () => {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    const array = await res.json()
    const obj = reduce(array)
    if (partOfSpeech) obj['meanings'][partOfSpeech][defIndex - 1]['matched'] = true
    setData(obj)
  }, [word])
  const Card = data ? (compact ? CompactCard : CompletedCard) : SkeletonCard
  const highlight = index % 2 === 0 ? colors.green : colors.yellow
  return (
      <div className={styles.card}>
        <span className={styles.title} style={{ background: highlight }}>{word}</span>
        <Card data={data}>{children}</Card>
        {data && partOfSpeech && <Toggle compact={compact} onClick={setCompact} />}
      </div>
  )
}

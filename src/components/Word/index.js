import React, { useEffect, useState } from 'react'

import styles from './styles.module.css'
import { abbreviate } from './PartOfSpeech'
import { colors } from '../Highlight'
import CompactCard from './CompactCard'
import CompletedCard from './CompletedCard'
import EmptyCard from './EmptyCard'
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

function getCard(data, compact) {
  if (data === undefined) return SkeletonCard
  if (data === null) return EmptyCard
  return compact ? CompactCard : CompletedCard
}

export default function Word({ children, color }) {
  const [word, partOfSpeech, defIndex = 1] = children.split('/')
  const [data, setData] = useState()
  const [compact, setCompact] = useState(!!partOfSpeech)
  useEffect(async () => {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    if (!res.ok) {
      setData(null)
      return
    }
    const array = await res.json()
    const obj = reduce(array)
    if (partOfSpeech) obj['meanings'][partOfSpeech][defIndex - 1]['matched'] = true
    setData(obj)
  }, [word])
  const Card = getCard(data, compact)
  return (
      <div className={styles.card}>
        <span className={styles.title} style={{ background: color ? colors[color] : 'unset' }}>{word}</span>
        <Card data={data}>{children}</Card>
        {data && partOfSpeech && <Toggle compact={compact} onClick={setCompact} />}
      </div>
  )
}

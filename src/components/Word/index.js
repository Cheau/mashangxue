import React, { useEffect, useState } from 'react'

import { abbreviate } from './PartOfSpeech'
import { colors } from '../Highlight'
import CompactCard from './CompactCard'
import CompletedCard from './CompletedCard'

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
  const [word, partOfSpeech] = children.split('/')
  const [data, setData] = useState()
  useEffect(async () => {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    const array = await res.json()
    setData(reduce(array))
  }, [word])
  if (!data) return null
  const Card = partOfSpeech ? CompactCard : CompletedCard
  const highlight = index % 2 === 0 ? colors.green : colors.yellow
  return <Card data={data} highlight={highlight}>{children}</Card>
}

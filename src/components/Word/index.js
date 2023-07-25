import React, { memo, useCallback, useContext, useEffect } from 'react'

import styles from './styles.module.css'
import { abbreviate } from './PartOfSpeech'
import { colors } from '../Highlight'
import Actions from './Actions'
import CompactCard from './CompactCard'
import CompletedCard from './CompletedCard'
import EmptyCard from './EmptyCard'
import SkeletonCard from './SkeletonCard'
import Phonetics from "./Phonetics"
import withProviders, { Context } from './withProviders'

const cards = {
  compact: CompactCard,
  completed: CompletedCard,
  lookup: CompletedCard,
}

function reduce(data) {
  let phonetic = {}
  let phonetics = {}
  const meanings = {}
  data.forEach((datum) => {
    if (datum.phonetic) phonetic[datum.phonetic] = undefined
    datum.phonetics.forEach(({ audio, text }) => {
      if (!audio) return
      const raw = text || datum.phonetic || ''
      phonetics[audio] = raw.replace(/(^\[)|(]$)/g, '/')
    })
    datum.meanings.forEach(({ partOfSpeech, definitions }) => {
      const abbr = abbreviate(partOfSpeech)
      if (!meanings[abbr]) meanings[abbr] = []
      meanings[abbr] = meanings[abbr].concat(definitions)
    })
  })
  phonetic = Object.keys(phonetic).map((key) => key).join(', ')
  phonetics = Object.entries(phonetics).map(([audio, text]) => ({ audio, text }))
  return { phonetic, phonetics, meanings }
}

function getCard(data, card) {
  if (data === undefined) return SkeletonCard
  if (data === null) return EmptyCard
  return cards[card]
}

async function query(word) {
  if (window.sessionStorage) {
    const cache = window.sessionStorage.getItem(word)
    if (cache) return JSON.parse(cache)
  }
  const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  if (!res.ok) return null
  const array = await res.json()
  const data = reduce(array)
  if (window.sessionStorage) window.sessionStorage.setItem(word,  JSON.stringify(data))
  return data
}

function Word(props) {
  const { color } = props
  const local = useContext(Context)
  const {
    word, partOfSpeech, defIndex, data, setData, card,
  } = local

  useEffect(async () => {
    if (!word) return
    const definition = await query(word)
    if (definition) {
      definition.word = word
      if (partOfSpeech) definition['meanings'][partOfSpeech][defIndex - 1]['matched'] = true
    }
    setData(definition)
  }, [word])
  if (data && data.word !== word) setData(undefined)

  const onMaximize = useCallback(() => {
    const e = new CustomEvent('lookup', { detail: { word } })
    document.dispatchEvent(e)
  }, [word])

  const Card = getCard(data, card)
  if (!Card) return null
  return (
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.title} style={{ background: color ? colors[color] : 'unset' }}>{word}</span>
          <Phonetics />
          <Actions onMaximize={onMaximize} />
        </div>
        <Card />
      </div>
  )
}

const arePropsEqual = (oldProps, newProps) => {
  const oldKeys = Object.keys(oldProps)
  const newKeys = Object.keys(newProps)
  if (oldKeys.length !== newKeys.length) return false
  for (let key of oldKeys) {
    if (oldProps[key] !== newProps[key]) return false
  }
  return true
}

const ContextualWord = withProviders(memo(
    Word,
    (oldProps, newProps) => arePropsEqual(oldProps.context, newProps.context),
))
export default ContextualWord

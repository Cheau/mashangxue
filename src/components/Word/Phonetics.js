import React, { useContext, useMemo } from 'react'
import { BiVolumeFull } from 'react-icons/bi'

import styles from './styles.module.css'
import { Context } from './withProviders'
import Player from '../Player'

const characters = {
  au: '澳',
  ca: '加',
  uk: '英',
  us: '美',
  stressed: '重读',
  unstressed: '非重读',
}

function characterize(search) {
  if (search === null) return ''
  const result = search[1]
  return result
      .split('-')
      .filter((s) => /\D+/.test(s))
      .map((s) => characters[s] || s)
      .join(',')
}

export default function Phonetics() {
  const { data, word } = useContext(Context)
  const filename = useMemo(
      () => new RegExp(`(?:\/en\/${word})([^/.]*)(?:\..+)$`, 'i'), [word])
  if (!data) return null
  const { phonetic, phonetics } = data
  return (
      <div className="phonetics">
        {!phonetics.length && phonetic && <div className={styles.phonetic}>{phonetic}</div>}
        {phonetics.map(({ audio, text }, i) => (
          <Player key={`p-${i}`} appearance="button" src={audio}>
            {characterize(filename.exec(audio))}
            <span style={{ margin: '0 10px' }}>{text}</span>
            <BiVolumeFull alignmentBaseline="middle" fontSize="130%" />
          </Player>
        ))}
      </div>
  )
}

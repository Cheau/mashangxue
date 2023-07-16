import React, { useMemo } from 'react'
import { BiVolumeFull } from 'react-icons/bi'

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
  console.log(search)
  if (search === null) return ''
  const result = search[1]
  return result
      .split('-')
      .filter((s) => /\D+/.test(s))
      .map((s) => characters[s] || s)
      .join(',')
}

export default function Phonetics({ phonetics, word }) {
  const filename = useMemo(
      () => new RegExp(`(?:\/${word})([^/.]*)(?:\..+)$`, 'i'), [word])
  return (
      <div>
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

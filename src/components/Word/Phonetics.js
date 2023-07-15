import React from 'react'
import { BiVolumeFull } from 'react-icons/bi'

import Player from '../Player'

function country(audio) {
  const result = /(?:-)(\w+)(?:\.mp3)$/.exec(audio)
  switch (result[1]) {
    case 'au': return '澳'
    case 'uk': return '英'
    case 'us': return '美'
    default: return result[1]
  }
}

export default function Phonetics({ phonetics }) {
  return (
      <div>
        {phonetics.map(({ audio, text }, i) => (
          <Player key={`p-${i}`} appearance="button" src={audio}>
            {country(audio)}
            <span style={{ margin: '0 10px' }}>{text}</span>
            <BiVolumeFull alignmentBaseline="middle" fontSize="130%" />
          </Player>
        ))}
      </div>
  )
}

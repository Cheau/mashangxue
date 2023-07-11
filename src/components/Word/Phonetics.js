import React from 'react'
import { BiVolumeFull } from 'react-icons/bi'

import Player from '../Player'

function country(audio) {
  if (audio.endsWith('-uk.mp3')) return '英'
  if (audio.endsWith('-us.mp3')) return '美'
}

export default function Phonetics({ phonetics }) {
  return (
      <div style={{ margin: '-5px' }}>
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

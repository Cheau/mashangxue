import React, { useMemo } from 'react'

import Type from '../../cmd/Type'
import Word from '../../components/Word'
import { usePresenting } from '../../common/state'

function render(lexemes, marks, play) {
  const global = { sentences: [], words: [] }
  lexemes.forEach((lexeme, i) => {
    let Block
    const children = []
    lexeme.forEach((token, j) => {
      const { type, literal } = token
      switch (type) {
        case Type.BLOCK:
        case Type.OPENING_TAG:
          Block = marks[literal](token, global)
          break
        case Type.INLINE:
          children.push(literal)
          break
        case Type.INLINE_BLOCK:
          const Component = marks[literal](token, global)
          children.push(<Component key={j} />)
      }
    })
    const tabIndex = play ? i + 1 : undefined
    global.sentences.push(<Block key={i} tabIndex={tabIndex}>{children}</Block>)
  })
  return global
}

export default function View({ lexemes = [], marks = {} }) {
  const presenting = usePresenting()
  const { sentences, words } = useMemo(() => render(lexemes, marks, presenting.get()), [presenting.get()])
  return (
      <>
        <div className="article">{sentences}</div>
        <div className="words">{words.map(({ color, text, word }, i) => (
          <Word key={i} color={color} id={word}>{text}</Word>
        ))}</div>
      </>
  )
}

import React, { useEffect, useMemo, useState } from 'react'

import Type from './interpreter/Type'
import Highlight from '../components/Highlight'
import Word from '../components/Word'

function Block(props) {
  return <div>{props.children}</div>
}

function render(lexemes, marks, play) {
  let count = 0
  const words = []
  const sentences = lexemes.map((lexeme, i) => {
    let Component = Block
    const children = []
    lexeme.forEach(({ type, text, literal }, j) => {
      switch (type) {
        case Type.TAG_MARK:
        case Type.TAG_HEAD:
          Component = marks[text]
          break
        case Type.PHRASE:
        case Type.TERMINATOR:
          children.push(text)
          break
        case Type.REFER:
          const [word, ...rest] = literal.split('/')
          const [variant, origin] = word.split(':')
          const green = count % 2 === 0
          const yellow = count % 2 === 1
          count++
          children.push(<Highlight key={j} green={green} yellow={yellow}>{variant}</Highlight>)
          words.push(`${origin || variant}/${rest.join('/')}`)
      }
    })
    const tabIndex = play ? i + 1 : undefined
    return <Component key={i} tabIndex={tabIndex}>{children}</Component>
  })
  return { sentences, words }
}

export default function View({ lexemes = [], marks = {} }) {
  const [play, setPlay] = useState(false)
  const { sentences, words } = useMemo(() => render(lexemes, marks, play), [play])
  useEffect(() => {
    const togglePlay = (e) => {
      const { ctrlKey, key } = e
      if (ctrlKey && key === 'p') setPlay(true)
      else if (ctrlKey && key === 'P') setPlay(false)
    }
    document.addEventListener('keypress', togglePlay)
    return () => document.removeEventListener('keypress', togglePlay)
  }, [])
  return (
      <>
        <div className="article">{sentences}</div>
        <div className="words">{words.map((word, i) => {
          const color = i % 2 === 0 ? 'green' : 'yellow'
          return <Word key={i} color={color}>{word}</Word>
        })}</div>
      </>
  )
}

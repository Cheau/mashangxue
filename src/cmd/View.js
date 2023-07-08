import React from 'react'

import Type from './interpreter/Type'
import Highlight from '../components/Highlight'
import Word from '../components/Word'

function Block(props) {
  return <div>{props.children}</div>
}

export default class View {
  #count = 0
  #marks

  constructor(marks = {}) {
    this.#marks = marks
  }

  render(lexemes = []) {
    const words = []
    const sentences = lexemes.map((lexeme, i) => {
      let Component = Block
      const children = []
      lexeme.forEach(({ type, text, literal }, j) => {
        switch (type) {
          case Type.TAG_MARK:
          case Type.TAG_HEAD:
            Component = this.#marks[text]
            break
          case Type.PHRASE:
          case Type.TERMINATOR:
            children.push(text)
            break
          case Type.REFER:
            const [word, ...rest] = literal.split('/')
            const [variant, origin] = word.split(':')
            const green = this.#count % 2 === 0
            const yellow = this.#count % 2 === 1
            this.#count++
            children.push(<Highlight key={j} green={green} yellow={yellow}>{variant}</Highlight>)
            words.push(`${origin || variant}/${rest.join('/')}`)
        }
      })
      return <Component key={i} tabIndex={i + 1}>{children}</Component>
    })
    return (
        <>
          <div className="article">{sentences}</div>
          <div className="words">{words.map((word, i) => <Word key={i} index={i}>{word}</Word>)}</div>
        </>
    )
  }

}

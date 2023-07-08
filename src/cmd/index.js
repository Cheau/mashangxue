import React from 'react'

import Interpreter from './interpreter'
import View from './View'

/**
 * Customizable Minified Markdown
 */
export default class Cmd extends React.Component {
  #lexemes
  #view

  constructor(props) {
    super(props)
    const { children, marks } = props
    const interpreter = new Interpreter(children)
    this.#lexemes = interpreter.run() || []
    this.#view = new View(marks)
  }

  render() {
    return this.#view.render(this.#lexemes)
  }

}

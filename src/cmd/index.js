import React from 'react'

import Interpreter from './interpreter'
import View from './View'

/**
 * Customizable Minified Markdown
 */
export default class Cmd extends React.Component {
  #lexemes
  #marks

  constructor(props) {
    super(props)
    const { children, marks } = props
    const interpreter = new Interpreter(children)
    this.#lexemes = interpreter.run() || []
    this.#marks = marks
  }

  render() {
    return <View lexemes={this.#lexemes} marks={this.#marks} />
  }

}

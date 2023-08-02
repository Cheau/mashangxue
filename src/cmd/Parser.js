import Type from './Type'

export default class Parser {
  #tokens
  #lexemes

  constructor(tokens) {
    this.#tokens = tokens
    this.#lexemes = []
  }

  parse() {
    let lexeme = []
    for (const token of this.#tokens) {
      switch (token.type) {
        case Type.BLOCK:
        case Type.OPENING_TAG:
          if (lexeme.length) {
            this.#lexemes.push(lexeme)
            lexeme = []
          }
          lexeme.push(token)
          break
        case Type.CLOSING_TAG:
          this.#lexemes.push(lexeme)
          lexeme = []
          break
        default:
          lexeme.push(token)
      }
    }
    if (lexeme.length) {
      this.#lexemes.push(lexeme)
    }
    return this.#lexemes
  }
}

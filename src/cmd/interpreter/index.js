import Parser from './Parser'
import Scanner from './Scanner'

export default class Interpreter {
  #source
  #scanner
  #parser

  constructor(source) {
    this.#source = this.#stringify(source)
    this.#scanner = new Scanner(this.#source)
  }

  #stringify(strOrArr) {
    if (typeof strOrArr === 'string') return strOrArr
    if (Array.isArray(strOrArr)) {
      return strOrArr.map((item) => {
        if (typeof item === 'string') return item
        if (item instanceof Object) {
          const { props: { mdxType, children } } = item
          const text = this.#stringify(children)
          return `<${mdxType}>${text}</${mdxType}>`
        }
        return ''
      }).join('')
    }
    return ''
  }

  run() {
    const tokens = this.#scanner.scan()

    this.#parser = new Parser(tokens)
    const lexemes = this.#parser.parse()

    return lexemes
  }
}

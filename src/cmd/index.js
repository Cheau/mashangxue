import Parser from './Parser'
import Scanner from './Scanner'

/**
 * Customizable Markdown
 */
export default class Cmd {
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
          const { props: { children }, type: { name } } = item
          const text = this.#stringify(children)
          return `<${name}>${text}</${name}>`
        }
        return ''
      }).join('')
    }
    return ''
  }

  run() {
    const tokens = this.#scanner.scan()
    this.#parser = new Parser(tokens)
    return this.#parser.parse() || []
  }
}

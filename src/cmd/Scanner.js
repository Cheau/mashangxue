import Token from './Token'
import * as scan from './scan'

const scanners = Object.entries(scan).reduce((accumulator, [filename, scanner]) => {
  accumulator[scanner.initial || filename] = scanner
  return accumulator
}, {})

class Scanner {
  #scanners
  #source
  #current = 0
  #start
  #tokens = []

  constructor(source) {
    this.#source = source
    this.#scanners = scanners
  }

  get current() {
    return this.#current
  }

  set current(value) {
    if (value < this.#current) throw new Error(`Invalid value: ${value}.`)
    this.#current = value
  }

  get start() {
    return this.#start
  }

  set start(value) {
    if (value < this.#start) throw new Error(`Invalid value: ${value}.`)
    this.#start = value
  }

  advance() {
    return this.#source[this.#current++]
  }

  delegator(char) {
    return this.#scanners[char]
  }

  hasNext(offset = 0) {
    return this.#current + offset < this.#source.length
  }

  forward(offset = 1) {
    if (offset < 0 || offset > this.#source.length - 1 - this.#current) throw new Error('offset is invalid.')
    this.#current += offset
  }

  match(expected, offset = 0) {
    const pos = this.#current + offset
    if (pos < this.#start || pos >= this.#source.length) return undefined
    const c = this.#source[pos]
    return expected instanceof RegExp ? expected.test(c) : expected === c
  }

  next() {
    return this.#source[this.#current]
  }

  peek() {
    return this.#source[this.#current - 1]
  }

  search(expected) {
    let index = this.#current
    if (expected instanceof RegExp) {
      while (index < this.#source.length && !expected.test(this.#source[index])) index++
    } else {
      while (index < this.#source.length && expected !== this.#source[index]) index++
    }
    return index < this.#source.length ? index : undefined
  }

  scan() {
    const text = this.#scanners['text']
    let c
    let handler
    while (this.hasNext()) {
      this.#start = this.#current
      c = this.advance()
      handler = this.#scanners[c] || text
      handler({ context: this, initial: true, noncapturing: false })
    }
    return this.#tokens
  }

  substring(start, end) {
    return this.#source.substring(start, end)
  }

  token(index) {
    return this.#tokens[index ?? this.#tokens.length - 1]
  }

  tokenize(type, literal) {
    const text = this.substring(this.#start, this.#current)
    const token = new Token({
      type,
      text,
      literal: literal || text,
      start: this.#start,
      end: this.#current - 1,
    })
    this.#tokens.push(token)
  }
}

export default Scanner

import Token from './Token'
import Type from './Type'

const res = {
  delimiter: /\/|\[|<|\.|!|\?/,
  digit: /[0-9]/,
  mark: /#/,
  tagName: /[a-zA-Z-]/,
  terminator: /\.|!|\?/,
}

class Scanner {
  #source
  #current = 0
  #start
  #tokens = []

  constructor(source) {
    this.#source = source
  }

  advance() {
    return this.#source[this.#current++]
  }

  hasNext() {
    return this.#current < this.#source.length
  }

  #isInitial() {
    return this.#current - this.#start === 1
  }

  match(expected, offset = 0) {
    const pos = this.#current + offset
    if (pos < this.#start || pos >= this.#source.length) return undefined
    const c = this.#source[pos]
    return expected instanceof RegExp ? expected.test(c) : expected === c
  }

  peek() {
    return this.#source[this.#current]
  }

  phrase() {
    let offset = -1
    let result
    do {
      result = this.match(res.delimiter, ++offset)
    } while (result !== undefined && !result) ;
    if (result === undefined || this.match('/', offset)) {
      this.#current += offset
      this.token(Type.PHRASE)
      return
    }
    if (this.match('[', offset)) {
      const current = this.#current + offset
      this.#current = current + 1
      if (this.refer(false)) {
        this.#current = current
        this.token(Type.PHRASE)
        return
      } else {
        this.phrase()
        return
      }
    }
    if (this.match('<', offset)) {
      const current = this.#current + offset
      this.#current = current + 1
      if (this.tag(false)) {
        this.#current = current
        this.token(Type.PHRASE)
        return
      } else {
        this.phrase()
        return
      }
    }
    if (this.match('.', offset)) {
      if (this.match(res.digit, offset - 1) && this.match(res.digit, offset + 1)) {
        this.#current += offset + 2
        this.phrase()
        return
      }
    }
    this.#current += offset
    this.token(Type.PHRASE)
    return
  }

  refer(obtain = true) {
    let offset = -1
    let result
    do {
      result = this.match(']', ++offset)
    } while (result !== undefined && !result) ;
    if (result === undefined) return false
    if (result && obtain) {
      this.#current += offset
      this.token(Type.REFER, this.substring(this.#start + 1, this.#current++))
    }
    return result
  }

  scan() {
    while (this.hasNext()) {
      this.#start = this.#current
      this.tokenize()
    }
    return this.#tokens
  }

  substring(start, end) {
    return this.#source.substring(start, end)
  }

  tag(obtain = true) {
    let offset = 0
    if (this.match('/', offset)) {
      while (this.match(res.tagName, ++offset)) ;
      if (this.match('>', offset)) {
        if (obtain) {
          this.#current += offset
          this.token(Type.TAG_TAIL, this.substring(this.#start + 2, this.#current++))
        }
        return true
      }
    } else if (this.match(res.tagName, offset)) {
      while (this.match(res.tagName, ++offset)) ;
      if (this.match('>', offset)) {
        if (obtain) {
          this.#current += offset
          this.token(Type.TAG_HEAD, this.substring(this.#start + 1, this.#current++))
        }
        return true
      }
    }
    return false
  }

  tagMark() {
    if (!this.#isInitial()) return false
    let offset = -1
    while (this.match('#', ++offset)) ;
    if (!this.match(' ', offset)) return false
    this.#current += offset
    this.token(Type.TAG_MARK)
    this.#current++
    return true
  }

  token(type, literal) {
    const text = this.substring(this.#start, this.#current)
    const token = new Token(type, text, literal, this.#start, this.#current)
    this.#tokens.push(token)
  }

  tokenize() {
    const c = this.advance()
    switch (c) {
      case '/':
        break
      case '[':
        if (this.refer()) break
      case '<':
        if (this.tag()) break
      case '#':
        if (this.tagMark()) break
      case ' ':
        if (this.#isInitial() && this.match(res.mark)) break
      default:
        if (res.terminator.test(c)) {
          this.token(Type.TERMINATOR)
        } else {
          this.phrase()
        }
    }
  }
}

export default Scanner

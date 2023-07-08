export default class Token {
  #type
  #text
  #literal
  #start
  #end

  constructor(type, text, literal, start, end) {
    this.#type = type
    this.#text = text
    this.#literal = literal
    this.#start = start
    this.#end = end

  }

  get type() {
    return this.#type
  }

  get text() {
    return this.#text
  }

  get literal() {
    return this.#literal
  }
}

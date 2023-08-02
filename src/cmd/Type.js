export default class Type {
  static BLOCK = Symbol('BLOCK')
  static INLINE = Symbol('INLINE')
  static INLINE_BLOCK = Symbol('INLINE_BLOCK')
  static OPENING_TAG = Symbol('OPENING_TAG')
  static CLOSING_TAG = Symbol('CLOSING_TAG')
}

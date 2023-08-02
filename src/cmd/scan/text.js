import Type from '../Type'

export default function text({ context, noncapturing }) {
  let char
  let delegator
  do {
    char = context.next()
    delegator = context.delegator(char)
    if (delegator) {
      const result = delegator({ context, initial: false, noncapturing: true })
      if (result) break
    }
    context.advance()
  } while (context.hasNext())
  if (noncapturing) return true
  context.tokenize(Type.INLINE)
  return true
}

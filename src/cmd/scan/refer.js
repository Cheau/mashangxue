import Type from "../Type"

export default function refer({ context, noncapturing }) {
  const index = context.search(']')
  if (index === undefined) return false
  if (noncapturing) return true
  context.forward(index - context.current + 1)
  context.tokenize(Type.INLINE_BLOCK, '[]')
  return true

}

refer.initial = '['

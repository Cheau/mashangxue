import Type from '../Type'

export default function escape({ context, noncapturing }) {
  if (noncapturing) return true
  context.forward()
  context.tokenize(Type.INLINE, context.peek())
  return true
}

escape.initial = '\\'

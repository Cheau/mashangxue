import Type from '../Type'

export default function heading({ context, initial, noncapturing }) {
  if (!initial && context.peek() !== ' ') return false
  let offset = 0
  while (context.match('#', offset)) offset++;
  if (!context.match(' ', offset)) return false
  if (noncapturing) return true
  context.forward(offset)
  context.tokenize(Type.BLOCK)
  context.forward()
  return true
}

heading.initial = '#'

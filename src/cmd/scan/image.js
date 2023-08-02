import Type from '../Type'

export default function image({ context, noncapturing }) {
  if (!context.match('[')) return false
  let offset = 0
  while (!context.match(']', ++offset)) ;
  if (!context.hasNext(offset)) return false

  if (!context.match('(', ++offset)) return false

  while (!context.match(')', ++offset)) ;
  if (!context.hasNext(offset)) return false

  if (noncapturing) return true
  context.forward(offset + 1)
  context.tokenize(Type.BLOCK, '![]()')
  return true
}

image.initial = '!'

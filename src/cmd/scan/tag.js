import Type from '../Type'

const tagName = /[a-zA-Z0-9-]/

export default function tag({ context, noncapturing }) {
  let offset = noncapturing ? 1 : 0
  let type
  if (context.match('/', offset)) {
    type = Type.CLOSING_TAG
  } else if (context.match(tagName, offset)) {
    type = Type.OPENING_TAG
  }
  if (!type) return false
  while (context.match(tagName, ++offset)) ;
  if (context.match('>', offset)) {
    if (noncapturing) return true
    context.forward(offset + 1)
    const start = context.start + (type === Type.OPENING_TAG ? 1 : 2)
    context.tokenize(type, context.substring(start, context.current - 1))
    return true
  }
  return false
}

tag.initial = '<'

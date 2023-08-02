import Type from '../Type'

const tagName = /[a-zA-Z-]/

export default function tag({ context, noncapturing }) {
  let offset = 0
  if (context.match('/', offset)) {
    while (context.match(tagName, ++offset)) ;
    if (context.match('>', offset)) {
      if (!noncapturing) return true
      context.forward(offset)
      context.tokenize(Type.CLOSING_TAG, context.substring(context.start + 2, context.current))
      context.forward()
      return true
    }
  } else if (context.match(tagName, offset)) {
    while (context.match(tagName, ++offset)) ;
    if (context.match('>', offset)) {
      if (!noncapturing) return true
      context.forward(offset)
      context.tokenize(Type.OPENING_TAG, context.substring(context.start + 1, context.current))
      context.forward()
      return true
    }
  }
  return false
}

tag.initial = '<'

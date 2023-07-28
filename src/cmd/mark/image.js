export default function image(scanner, obtain = true) {
  if (!scanner.match('[')) return false
  let offset = 0
  while (!scanner.match(']', ++offset)) ;
  if (!scanner.hasNext(offset)) return false

  if (!scanner.match('(', ++offset)) return false

  while (!scanner.match(')', ++offset)) ;
  if (!scanner.hasNext(offset)) return false

  if (obtain) scanner.forward(offset + 1)
  return true
}

image.initial = '!'

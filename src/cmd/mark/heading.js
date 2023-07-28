export default function heading(scanner, obtain = true) {
  let offset = -1
  while (scanner.match('#', ++offset)) ;
  if (!scanner.match(' ', offset)) return false
  if (obtain) scanner.forward(offset)
  return true
}

heading.initial = '#'

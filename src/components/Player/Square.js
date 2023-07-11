import Default from './Default'

export default function Square(props) {
  const { style, ...rest } = props
  const squareStyle = {
    height: '2em',
    width: '2em',
    lineHeight: '2em',
    padding: 0,
    ...style,
  }
  return <Default style={squareStyle} {...rest} />
}

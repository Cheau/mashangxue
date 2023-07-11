import React from 'react'

export const colors = {
  green: '#66FF66',
  yellow: '#FFFF66',
}

export default function Highlight(props) {
  const { children, green = false, yellow = false } = props
  const bc = green ? 'green' : (yellow ? 'yellow' : undefined)
  const style = {
    backgroundColor: colors[bc],
    borderRadius: '100px',
    padding: '0 8px',
  }
  return (
      <span style={style}>{children}</span>
  )
}
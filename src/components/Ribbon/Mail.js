import React from 'react'

export default function Mail({
  border = 10,
  children,
  style = {},
  ...rest
}) {
  return (
    <div className="mail-wrapper" style={{
      height: '100%',
      padding: `${border}px`,
      background: 'repeating-linear-gradient(45deg, #fff , #fff 10px, #3C7AB8 0, #3C7AB8 20px, #fff 0, #fff 30px, #CB2C4B 0, #CB2C4B 40px)',
      ...style,
    }}>
      <div className="mail" style={{ height: '100%', overflow: 'hidden', ...rest }}>{children}</div>
    </div>
  )
}
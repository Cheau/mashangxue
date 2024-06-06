import React, { useState } from 'react'

const withHover = (Component) => (props) => {
  const [hovering, setHovering] = useState(false)
  return <Component
    {...props}
    hovering={hovering}
    onMouseLeave={() => setHovering(false)}
    onMouseOver={() => setHovering(true)}
  />
}

export default withHover

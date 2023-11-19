import React from 'react'

import Bubble from '../../components/Bubble'

const heading = (token) => function Heading(props) {
  const { literal } = token
  return <Bubble {...props} right={literal !== 'h1'} />
}

export default heading

import React from 'react'

import Bubble from '../../components/Bubble'

const heading = (token) => function Heading(props) {
  const { text } = token
  return <Bubble {...props} right={text === '##'} />
}

export default heading

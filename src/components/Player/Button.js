import React from 'react'

import Default from './Default'

export default function Button(props) {
  const { hovering, ...rest } = props
  return <Default {...rest} />
}

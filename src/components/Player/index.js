import React, { forwardRef } from 'react'

import button from './Button'
import Default from './Default'
import music from './Music'
import square from './Square'

const Players = {
  default: Default,
  button,
  music,
  square,
}

export default forwardRef(function Player(props, ref) {
  const { appearance = 'default' } = props
  const Player = Players[appearance]
  return <Player {...props} ref={ref} />
})

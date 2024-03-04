import React, { useState } from 'react'
import LazyLoad from 'react-lazyload'

import Landscape from './Landscape'
import Portrait from './Portrait'
import Printer from './Printer'
import Square from './Square'

function getComponent(landscape, portrait) {
  if (landscape) return Landscape
  if (portrait) return Portrait
  return Square
}

export default function WordCard(props) {
  const [print, setPrint] = useState(false)
  const { landscape = false, portrait = false } = props
  const Component = getComponent(landscape, portrait)
  const card = <Component {...props} print={() => setPrint(true)} />
  return (
    <LazyLoad once>
      <div style={{ width: '600px', fontSize: '14px' }}>
        {card}
      </div>
      {print && (
        <Printer onClose={() => setPrint(false)}>
          <div style={{ width: '1600px', fontSize: '36px' }}>
            {card}
          </div>
        </Printer>
      )}
    </LazyLoad>
  )
}

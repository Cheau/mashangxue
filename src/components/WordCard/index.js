import React, { useState } from 'react'
import LazyLoad from 'react-lazyload'
import clsx from 'clsx'

import cards from './shared/cards.module.css'
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
      <div className={clsx(cards.normal)}>{card}</div>
      {print && (
        <Printer onClose={() => setPrint(false)}>
          <div className={clsx(cards.printer)}>{card}</div>
        </Printer>
      )}
    </LazyLoad>
  )
}

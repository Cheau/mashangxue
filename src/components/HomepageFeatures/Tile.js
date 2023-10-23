import React, { useEffect } from 'react'

import data from './data'
import styles from './tile.module.css'
import { useHookstate } from '@hookstate/core'
import Feature from './Feature'
import clsx from 'clsx'

export default function Tile() {
  const index = useHookstate(0)
  const features = data.map((datum, i) => <Feature key={i} {...datum} />)
  const feature = features[index.get() % 3]
  useEffect(() => {
    const id = setInterval(() => index.set(i => i + 1), 11000)
    return () => clearInterval(id)
  }, [])
  return (
      <div className={clsx('features-tile', styles.tile )}>
        {feature}
      </div>
  )
}

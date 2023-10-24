import React from 'react'
import clsx from 'clsx'

import styles from './styles.module.css'
import { usePresenting } from '../../common/state'
import QrCode from '../QrCode'
import Features from '../HomepageFeatures/Tile'

const getPathname = () => {
  if (typeof window === 'undefined') return undefined
  return window.location.pathname
}

export default function Sidebar() {
  const presenting = usePresenting()
  const pathname = getPathname()
  return (
      <div className={clsx('sidebar', styles.sidebar)}>
        <div className={clsx(styles.centered, { [styles.presenting]: presenting.get() })}>
          <QrCode />
          {pathname !== '/' && <Features />}
        </div>
      </div>
  )
}

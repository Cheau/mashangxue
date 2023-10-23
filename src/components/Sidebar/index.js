import React from 'react'
import clsx from 'clsx'

import styles from './styles.module.css'
import { usePresenting } from '../../common/state'
import QrCode from '../QrCode'
import Features from '../HomepageFeatures/Tile'

export default function Sidebar() {
  const presenting = usePresenting()
  return (
      <div className={clsx('sidebar', styles.sidebar)}>
        <div className={clsx(styles.centered, { [styles.presenting]: presenting.get() })}>
          <QrCode />
          <Features />
        </div>
      </div>
  )
}

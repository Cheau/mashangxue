import React from 'react'
import clsx from 'clsx'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

import styles from './styles.module.css'
import { usePresenting } from '../../common/state'
import QrCode from '../QrCode'
import Features from '../HomepageFeatures/Tile'

const getPathname = () => {
  if (typeof window === 'undefined') return undefined
  return window.location.pathname
}

export default function Sidebar() {
  const { siteConfig } = useDocusaurusContext()
  const presenting = usePresenting()
  const pathname = getPathname()
  const { groups: { name, domain } } = /(?<=:\/\/)(?<name>[^.]+)\.(?<domain>[^.]+)$/.exec(siteConfig.url)
  return (
      <div className={clsx('sidebar', styles.sidebar)}>
        <div className={clsx(styles.centered, { [styles.presenting]: presenting.value })}>
          <div className={styles.url}>
            <div className={styles.name}>
              {name}<span className={styles.domain}>.{domain}</span>
            </div>
            <div className={styles.label}>网站地址</div>
          </div>
          {!presenting.value && <QrCode />}
          {pathname !== '/' && <Features />}
        </div>
      </div>
  )
}

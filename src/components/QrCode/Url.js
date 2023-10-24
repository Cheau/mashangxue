import React from 'react'
import { QRCode } from 'react-qrcode-logo'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import logo from '@site/static/img/logo.png'

import styles from './styles.module.css'

export default function Url() {
  const { siteConfig } = useDocusaurusContext();
  const url = typeof window === 'undefined' ? siteConfig.url : window.location.href
  return (
      <div className={styles.url}>
        <div>
          <QRCode
              logoImage={logo}
              logoPadding={6}
              qrStyle="dots"
              value={url}
          />
          <div className={styles.slogan}>
            访问网页，扫一扫<br/>
            {siteConfig.url.substr(siteConfig.url.indexOf('://') + 3)}
          </div>
        </div>
      </div>
  )
}

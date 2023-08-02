import React from 'react'
import { QRCode } from 'react-qrcode-logo'
import logo from '@site/static/img/logo.png'

import styles from './styles.module.css'

export default function Url() {
  return (
      <div className={styles.url}>
        <div>
          <QRCode
              logoImage={logo}
              logoPadding={6}
              qrStyle="dots"
              value={window.location.href}
          />
          <div className={styles.slogan}>
            访问网页，扫一扫<br/>
            MaShangXue.xyz
          </div>
        </div>
      </div>
  )
}

import React from 'react'

import styles from './styles.module.css'
import Alipay from './Alipay'

export default function QrCode() {
  return (
      <div className={styles.qrCode}>
        <div className={styles.centered}>
          <Alipay horizontal={false}>
            <div className={styles.domain}>网站访问地址<br />MaShangXue.xyz</div>
          </Alipay>
        </div>
      </div>
  )
}

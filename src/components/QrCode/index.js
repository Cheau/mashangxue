import React from 'react'

import styles from './styles.module.css'
import Wechat from "./Wechat"

export default function QrCode() {
  return (
      <div className={styles.qrCode}>
        <div>
          <Wechat horizontal={false}/>
        </div>
      </div>
  )
}

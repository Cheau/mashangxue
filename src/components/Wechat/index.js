import React from 'react'

import styles from './styles.module.css'
import QrCode from '@site/static/img/wechat_344.jpg'

export default function Wechat({ horizontal = true }) {
  return (
      <section className={styles.wechat} style={{
        flexDirection: horizontal ? 'row' : 'column',
      }}>
        <img src={QrCode} />
        <div className={styles.slogan}>微信扫码关注<br/>订阅最新动态</div>
      </section>
  )
}

import React from 'react'
import image from '@site/static/img/alipay.jpg'

import styles from './styles.module.css'
import Portrait from './Portrait'

export default function Alipay(props) {
  return (
      <div className={styles.alipay}>
        <Portrait image={image} slogan="支付宝，扫一扫\n你的一点鼓励\n是我持续创作动力" {...props} />
      </div>
  )
}

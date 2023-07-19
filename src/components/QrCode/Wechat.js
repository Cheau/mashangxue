import React from 'react'

import Portrait from './Portrait'
import image from '@site/static/img/wechat_344.jpg'

export default function Wechat(props) {
  return <Portrait image={image} slogan="微信扫码关注\n订阅最新动态" {...props} />
}

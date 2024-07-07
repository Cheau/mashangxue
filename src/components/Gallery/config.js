import React from 'react'
import { FcAdvertising, FcHome } from 'react-icons/fc'

export default {
  'ad': {
    icon: <FcAdvertising />,
    title: '发现精彩',
    tool: false,
  },
  'sc/dc': {
    icon: <FcHome />,
    title: '空中英语教室-日常对话',
    tool: true,
    Player: require('@site/src/components/Frame/sc/dc').default,
  },
}

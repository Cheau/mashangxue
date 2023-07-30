import React from 'react'
import {
  FcSearch,
  FcClock,
  FcCloseUpMode,
  FcSmartphoneTablet,
} from 'react-icons/fc'

import styles from './landscape.module.css'

const data = [
  { icon: <FcSearch />, title: '快速查单词', subtitle: '选中页面单词即可查询，用鼠标双击可快速选中' },
  { icon: <FcClock />, title: '瞻前又顾后', subtitle: '在你连续查词时，可通过查询记录来回顾' },
  { icon: <FcSmartphoneTablet />, title: '学习尽掌握', subtitle: '页面适配手机和平板电脑，让你随时随地想学就学' },
  { icon: <FcCloseUpMode />, title: '技术促进步', subtitle: '用技术辅助学习，更多功能持续开发中...' },
]

export default function Landscape() {
  const features = data.map(({ icon, title, subtitle }, i) => (
      <div key={i} className={styles.feature}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div className={styles.subtitle}>{subtitle}</div>
        </div>
      </div>
  ))
  return (
      <div className={styles.background}>
        <div className="container" style={{ overflow: 'hidden' }}>
          <div className={styles.landscape}>
            <div className={styles.primary}>
              {features}
            </div>
            <div className={styles.secondary}>
              {features}
            </div>
          </div>
        </div>
      </div>
  )
}

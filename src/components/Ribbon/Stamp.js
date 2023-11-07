import React from 'react'

import styles from './Stamp.module.css'
import Rate from '../Rate'

const lineHeight = 1.5

const rotate = (fontSize, text, up = false) => {
  const offsetX = fontSize / 2
  const baseD = fontSize * (/[\u4e00-\u9fa5]/.test(text) ? 0.6 : 0.2)
  const offsetD = (text.length - 1) / 2 * baseD
  let chars = Array.from(text)
  if (!up) chars = chars.reverse()
  return chars.map((char, index) => {
    const degree = index * baseD - offsetD
    const style = {
      fontSize,
      left: `calc(50% - ${offsetX}px)`,
      lineHeight,
      width: fontSize,
      transform: `rotate(${degree}deg)`,
    }
    return <span key={index} style={style}>{char}</span>
  })
}

export default function Stamp({
  children,
  date = new Date(),
  Icon,
  rate,
  size = 400,
  text = '打卡',
  lower = 'Just do IT',
  upper = '码上学英语',
}) {
  const fontSize = size * 0.16
  const charSize = size * 0.1
  const uppers = rotate(charSize, upper, true)
  const lowers = rotate(charSize, lower)
  const innerSize = size - charSize * 1.5 * 2
  const innerOffset = (size - innerSize) / 2
  return (
    <div className={styles.stamp} style={{
      fontSize,
      height: size,
      width: size,
    }}>
      <div className={styles.up}>{uppers}</div>
      <div className={styles.low}>{lowers}</div>
      <div className={styles.inner} style={{
        height: innerSize,
        left: innerOffset,
        top: innerOffset,
        width: innerSize,
      }}>
        {children || (
          <>
            <div className={styles.rating}>
              <Rate Icon={Icon} max={3} value={rate} />
            </div>
            <strong>{text}</strong>
            <div className={styles.date}>{date instanceof Date ? date.toLocaleDateString('zh-CN') : date}</div>
          </>
        )}
      </div>
    </div>
  )
}

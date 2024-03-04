import React from 'react'
import clsx from 'clsx'

import styles from './Photo.module.css'
import Image from '../Image'
import Watermark from './Watermark'

export default function Photo(props) {
  const {
    children, img, landscape, print, topic, x, y,
  } = props
  const ratio = landscape ? 4 / 3 : 3 / 4
  return (
    <div className={clsx('photo', styles.photo)} onClick={print}>
      <Image left={x} ratio={ratio} src={img} top={y}>
        {children}
        <Watermark topic={topic} />
      </Image>
    </div>
  )
}

import React, { useState } from 'react'

import styles from './styles.module.css'
import Ocr from '../Ocr'
import Ribbon from '../Ribbon'

const id = Symbol('frame').toString()

export default function frame({
    allowFullScreen = true,
    ratio = 9 / 16,
    ribbon,
    src,
    style = { border: 'none', overflow: 'hidden' },
    ...rest
}) {
  const [video, setVideo] = useState(false)
  const useOcr = (e) => {
    e.stopPropagation()
    const iframe = document.getElementById(id)
    const videos = iframe.contentWindow.document.getElementsByTagName('video')
    setVideo(videos[0])
  }
  return (
      <div className={styles.frame} style={{ paddingTop: `${ratio * 100}%` }}>
        <div className={styles.full}>
          <iframe
            allowFullScreen={allowFullScreen}
            id={id}
            src={src}
            style={style}
            {...rest}
          />
          {video && <Ocr video={video} />}
          <Ribbon.Corner>{ribbon}</Ribbon.Corner>
        </div>
        <div className={styles.toolbar} onClick={useOcr}>ocr</div>
      </div>
  )
}

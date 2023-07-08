import React, { useRef } from 'react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

import styles from './styles.module.css'

const getTitle = () => {
  const { pathname } = window.location
  return pathname.replace('/docs/', '').split('/').join('_')
}

const toCanvas = (src, callback = () => {}) => {
  html2canvas(src).then(callback)
}

const toJpeg = (src, title) => {
  toCanvas(src, (canvas) => {
    canvas.toBlob((blob) => {
      const a = document.createElement('a')
      a.href = window.URL.createObjectURL(blob)
      a.download = `${title || getTitle()}.jpg`
      a.click()
    }, 'image/jpeg, 1.0')
  })
}

const toPdf = (src, title) => {
  toCanvas(src, (canvas) => {
    const imageData = canvas.toDataURL('image/jpeg', 1.0)
    const pdf = new jsPDF('portrait', 'px', [1600, 2000])
    pdf.addImage({
      imageData,
      format: 'JPEG',
      x: 0,
      y: 0,
    })
    pdf.save(`${title || getTitle()}.pdf`)
  })
}

export default function Box(props) {
  const {
    children, paper, title, pdf = false, pic = false, watermark = false, ...rest
  } = props
  const mergedStyle = {
    position: 'relative',
    ...rest,
  }
  const boxRef = useRef()
  return (
      <div className={styles[paper]} style={mergedStyle} ref={boxRef}>
        {watermark && <div className={styles.watermark} />}
        {children}
        <div className={styles.actions}>
          {pic && <button onClick={() => toJpeg(boxRef.current, title)}>导出JPG</button>}
          {pdf && <button onClick={() => toPdf(boxRef.current, title)}>导出PDF</button>}
        </div>
      </div>
  )
}

import React, { useRef } from 'react'
import clsx from 'clsx'
import domToImage from 'dom-to-image'
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

const toJpeg = (src, title, callback) => {
  domToImage.toJpeg(src).then((dataUrl) => {
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `${title || getTitle()}.jpg`
    a.click()
    callback()
  })
}

const toPdf = (src, title, callback) => {
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
    callback()
  })
}

function Ratio({ children, ratio}) {
  if (!ratio) return children
  return (
    <div className={clsx('ratio', styles.ratio)} style={{ paddingTop: `${ratio * 100}%`}}>
      <div className={clsx('full', styles.full)}>
        {children}
      </div>
    </div>
  )
}

export default function Box({
  children,
  className,
  paper,
  print: { pdf = false, pic = false } = {},
  ratio,
  style,
  title,
  watermark = false,
  width,
  ...rest
}) {
  const classNames = clsx('box', styles.box, styles[paper], { [styles.bounded]: ratio }, className)
  const boxRef = useRef()
  const actionsRef = useRef()
  const exp = (callback) => {
    const { display } = actionsRef.current.style
    actionsRef.current.style.display = 'none'
    callback(boxRef.current, title, () => actionsRef.current.style.display = display)
  }
  return (
    <div className={classNames} style={{ width, ...style }} ref={boxRef} {...rest}>
      <Ratio ratio={ratio}>
        {watermark && <div className={styles.watermark} />}
        {children}
        <div className={styles.actions} ref={actionsRef}>
          {pic && <button onClick={() => exp(toJpeg)}>导出JPG</button>}
          {pdf && <button onClick={() => exp(toPdf)}>导出PDF</button>}
        </div>
      </Ratio>
    </div>
  )
}

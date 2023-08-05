import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { BiX } from 'react-icons/bi'

import styles from './styles.module.css'

export default function Modal({ children, onClose, open = false }) {
  const [isOpen, setIsOpen] = useState()
  const [context, setContext] = useState()
  useEffect(() => {
    setIsOpen(open)
    if (open) {
      const { scrollY } = window
      const { position, top, width } = document.body.style
      setContext({ position, top, width })
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
    }
  }, [open])
  const close = () => {
    setIsOpen(false)
    const scrollY = document.body.style.top || 0
    const { position, top, width } = context
    document.body.style.position = position
    document.body.style.top = top
    document.body.style.width = width
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    setContext()
    if (typeof onClose === 'function') onClose()
  }
  if (!isOpen) return null
  const modal = (
      <div className={styles.backdrop} onClick={close}>
        <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
          {children}
          <span className={styles.close} onClick={close}><BiX /></span>
        </div>
      </div>
  )
  return ReactDOM.createPortal(modal, document.body)
}

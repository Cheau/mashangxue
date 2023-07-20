import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { BiX } from 'react-icons/bi'

import styles from './styles.module.css'

export default function Modal({ children, onClose, open = false }) {
  const [isOpen, setIsOpen] = useState()
  const [overflow, setOverflow] = useState()
  useEffect(() => {
    setIsOpen(open)
    if (open) {
      setOverflow(document.body.style.overflow)
      document.body.style.overflow = 'hidden'
    }
  }, [open])
  const close = () => {
    setIsOpen(false)
    document.body.style.overflow = overflow
    setOverflow()
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

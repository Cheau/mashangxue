import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { BiX } from 'react-icons/bi'

import styles from './styles.module.css'
import { useSession } from '../../common/hooks'

export default function Modal({ children, onClose, open = false }) {
  const [isOpen, setIsOpen] = useState()
  const [context, setContext] = useSession('modal')
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
    return close
  }, [open])
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

import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { BiX } from 'react-icons/bi'

import styles from './styles.module.css'
import { useSession } from '../../common/hooks'

const show = () => {
  const { scrollY } = window
  const { position, top, width } = document.body.style
  document.body.style.position = 'fixed'
  document.body.style.top = `-${scrollY}px`
  document.body.style.width = '100%'
  return { position, top, width }
}

const hide = (context) => {
  const scrollY = document.body.style.top || 0
  const { position, top, width } = context
  document.body.style.position = position
  document.body.style.top = top
  document.body.style.width = width
  window.scrollTo(0, parseInt(scrollY || '0') * -1)
}

export default function Modal({ children, onClose, open = false }) {
  const [isOpen, setIsOpen] = useState()
  const [context, setContext] = useSession('modal')
  useEffect(() => {
    setIsOpen(open)
    if (open) setContext(show())
  }, [open])
  useEffect(() => {
    if (isOpen !== false) return
    hide(context)
    if (typeof onClose === 'function') onClose()
  }, [isOpen])
  if (!isOpen) return null
  const modal = (
      <div className={styles.backdrop} onClick={() => setIsOpen(false)}>
        <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
          {children}
          <span className={styles.close} onClick={() => setIsOpen(false)}><BiX /></span>
        </div>
      </div>
  )
  return ReactDOM.createPortal(modal, document.body)
}

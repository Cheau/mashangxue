import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { BiX } from 'react-icons/bi'

import styles from './styles.module.css'

let root

let overflow

export default function Modal(props) {
  const [open, setOpen] = useState(!!props.open)
  if (!open) return null
  if (!overflow) {
    overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }
  const close = () => {
    setOpen(false)
    document.body.style.overflow = overflow
    overflow = undefined
    root = root.remove()
  }
  const modal = (
      <div className={styles.backdrop} onClick={close}>
        <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
          {props.children}
          <span className={styles.close} onClick={close}><BiX /></span>
        </div>
      </div>
  )
  return ReactDOM.createPortal(modal, document.body)
}

Modal.open = (children) => {
  if (!root) root = document.createElement('div')
  const modal = <Modal open={true}>{children}</Modal>
  ReactDOM.render(modal, root)
}

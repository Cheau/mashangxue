import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

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

const global = {
  context: undefined,
  open: undefined,
}

export default function Backdrop({ onClose, open = false, ...rest }) {
  const [context, setContext] = useSession('backdrop')
  const close = () => {
    if (!global.open) return
    if (global.context) {
      hide(global.context)
      global.open = false
      setContext(undefined)
    }
    if (typeof onClose === 'function') onClose()
  }
  useEffect(() => {
    global.context = context
    if (!open) return
    global.open = open
  }, [context, open])
  useEffect(() => {
    if (open) setContext(show())
    else close()
    return close
  }, [open])
  if (!open) return null
  const backdrop = (
      <div className={styles.backdrop} {...rest} onClick={close} />
  )
  return ReactDOM.createPortal(backdrop, document.body)
}

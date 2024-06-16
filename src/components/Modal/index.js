import React  from 'react'
import { BiX } from 'react-icons/bi'

import styles from './styles.module.css'
import Backdrop from '../Backdrop'

export default function Modal({ children, onClose, open }) {
  return (
      <Backdrop open={open} onClose={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          {children}
          <span className={styles.close} onClick={onClose}><BiX /></span>
        </div>
      </Backdrop>
  )
}

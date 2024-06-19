import React  from 'react'
import BrowserOnly from '@docusaurus/BrowserOnly'
import { BiX } from 'react-icons/bi'

import styles from './styles.module.css'

export default function Modal({ children, onClose, open }) {
  return (
      <BrowserOnly fallback={<div>Loading...</div>}>
        {() => {
          const Backdrop = require('@site/src/components/Backdrop').default
          return (
              <Backdrop open={open} onClose={onClose}>
                <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                  {children}
                  <span className={styles.close} onClick={onClose}><BiX /></span>
                </div>
              </Backdrop>
          )
        }}
      </BrowserOnly>
  )
}

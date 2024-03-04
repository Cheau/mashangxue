import React, { useState } from 'react'

import styles from './Printer.module.css'
import Box from '../Box'
import Modal from '../Modal'

export default function Printer({ children, onClose }) {
  const [open, setOpen] = useState(true)
  const close = () => {
    setOpen(false)
    onClose()
  }
  return (
    <Modal open={open} onClose={close}>
      <div className={styles.printer}>
        <Box print={{ pic: true }}>
          {children}
        </Box>
      </div>
    </Modal>
  )
}
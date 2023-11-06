import React from 'react'

import styles from './styles.module.css'
import Heading from './Heading'
import Mail from './Mail'
import Stamp from './Stamp'

export default function Ribbon({ children }) {
  return children ? <div className={styles.ribbon}>{children}</div> : null
}

Ribbon.Heading = Heading
Ribbon.Mail = Mail
Ribbon.Stamp = Stamp

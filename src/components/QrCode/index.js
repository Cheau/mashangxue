import React, { useEffect, useState } from 'react'

import styles from './styles.module.css'
import Alipay from './Alipay'
import Url from './Url'

const Components = [Url, Alipay]

export default function QrCode() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    let i = 0
    const id = setInterval(() => setIndex(i++ % Components.length), 5000)
    return () => clearInterval(id)
  }, [])
  return (
      <div className={styles.qrCode}>
        <div className={styles.centered}>
          {Components.map((Component, i) => (
              <div key={i} style={{ display: index === i ? 'unset' : 'none' }}>
                <Component />
              </div>
          ))}
        </div>
      </div>
  )
}

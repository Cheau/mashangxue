import React, { useEffect, useState } from 'react'

import styles from './styles.module.css'
import { usePresenting } from '../../common/state'
import Alipay from './Alipay'
import Url from './Url'

export default function QrCode() {
  const [components, setComponents] = useState([Url, Alipay])
  const presenting = usePresenting()
  const [index, setIndex] = useState(0)
  useEffect(() => {
    let i = 0
    const id = setInterval(() => setIndex(i++ % components.length), 5000)
    return () => clearInterval(id)
  }, [components])
  useEffect(() => {
    setComponents(presenting.get() ? [Url] : [Url, Alipay])
  }, [presenting.get()])
  return (
      <div className={styles.qrCode}>
        <div className={styles.centered}>
          {components.map((Component, i) => (
              <div key={i} style={{ display: index === i ? 'unset' : 'none' }}>
                <Component />
              </div>
          ))}
        </div>
      </div>
  )
}

import React, { useEffect, useMemo } from 'react'
import { useHookstate } from '@hookstate/core'
import clsx from 'clsx'

import styles from './styles.module.css'
import { usePresenting } from '../../common/state'
import Alipay from './Alipay'
import Url from './Url'

export default function QrCode() {
  const presenting = usePresenting()
  const index = useHookstate(0)
  const Component = useMemo(() => {
    const Components = presenting.value ? [Url] : [Url, Alipay]
    return Components[index.value % Components.length]
  }, [presenting, index])
  useEffect(() => {
    const id = setInterval(() => index.set(i => i + 1), 11000)
    return () => clearInterval(id)
  }, [])
  return (
      <div className={clsx('qrCode', styles.qrCode)}>
        <Component />
      </div>
  )
}

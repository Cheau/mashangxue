import React from 'react'

import styles from './styles.module.css'

export default function Button(props) {
  const { children, hovering, ...rest } = props
  return (
      <div className={styles.block} {...rest}>
        {children}
      </div>
  )
}

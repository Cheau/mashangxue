import React from 'react'

import styles from './styles.module.css'

export default function Portrait({ image, slogan = '' }) {
  const html = slogan.replace(/\\n/g, '<br/>')
  return (
      <div className={styles.portrait}>
        <img src={image} alt="QR Code" />
        <div className={styles.slogan} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
  )
}

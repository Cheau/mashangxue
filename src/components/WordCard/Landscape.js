import React from 'react'
import clsx from 'clsx'

import styles from './Landscape.module.css'
import fonts from './shared/fonts.module.css'
import Box from '../Box'
import Detail from './Detail'
import Photo from './Photo'

function Content({ title, subtitle, children }) {
  return (
    <div className={clsx('content', styles.content)}>
      <div className={clsx('title', fonts.title)}>{title}</div>
      <div className={clsx('subtitle', fonts.subtitle)}>{subtitle}</div>
      <Detail>{children}</Detail>
    </div>
  )
}

export default function Landscape(props) {
  return (
    <div className={clsx('landscape', styles.landscape)}>
      <Box shadowed>
        <div style={{ display: 'flex' }}>
          <Photo {...props} />
          <Content {...props} />
        </div>
      </Box>
    </div>
  )
}

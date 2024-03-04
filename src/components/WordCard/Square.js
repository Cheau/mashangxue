import React from 'react'
import clsx from 'clsx'

import styles from './Square.module.css'
import fonts from './shared/fonts.module.css'
import Box from '../Box'
import Detail from './Detail'
import Photo from './Photo'

function Content({ title, subtitle, children }) {
  return (
    <div className={clsx('content', styles.content)}>
      <div className={clsx('titles', styles.titles)}>
        <span className={clsx('title', fonts.title)}>{title}</span>
        <span className={clsx('divider', styles.divider)} />
        <span className={clsx('subtitle', fonts.subtitle)}>{subtitle}</span>
      </div>
      <Detail>{children}</Detail>
    </div>
  )
}

export default function Square(props) {
  return (
    <div className={clsx('square', styles.square)}>
      <Box ratio={1} shadowed>
        <Photo {...props} />
        <Content {...props} />
      </Box>
    </div>
  )
}

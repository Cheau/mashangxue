import React from 'react'
import clsx from 'clsx'

import styles from './Portrait.module.css'
import fonts from './shared/fonts.module.css'
import Box from '../Box'
import Detail from './Detail'
import Photo from './Photo'

function Content({ children }) {
  return (
    <div className={clsx('content', styles.content)}>
      {children}
    </div>
  )
}

export default function Portrait(props) {
  const {
    children, subtitle, title,
  } = props
  return (
    <div className={clsx('portrait', styles.portrait)}>
      <Box shadowed>
        <Content>
          <div className={clsx('title', fonts.title)}>{title}</div>
        </Content>
        <Content>
          <Photo {...props} />
        </Content>
        <Content>
          <div className={clsx('subtitle', fonts.subtitle)}>
            {subtitle}
          </div>
          <Detail>{children}</Detail>
        </Content>
      </Box>
    </div>
  )
}

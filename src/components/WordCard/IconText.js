import React from 'react'
import clsx from 'clsx'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { FaHashtag } from 'react-icons/fa'

import styles from './IconText.module.css'
import colors from './shared/colors.module.css'

export default function IconText({ children, className, icon }) {
  return (
    <div className={clsx('icon-text', styles.iconText, className)}>
      <span className={clsx('icon', styles.icon)}>{icon}</span>
      <span className={clsx('text', styles.text)}>{children}</span>
    </div>
  )
}

export function Account() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <IconText className={clsx('account', colors.bgYellow)} icon={<img src="/img/logo.png" alt="logo" />}>
      {siteConfig.title}
    </IconText>
  )
}

export function Topic({ children }) {
  return (
    <IconText className={clsx('topic', colors.bgBlue)} icon={<FaHashtag />}>
      {children}
    </IconText>
  )
}

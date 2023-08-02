import React, { useEffect, useMemo } from 'react'

import styles from './styles.module.css'
import Cmd from '../../cmd'
import heading from './heading'
import image from './image'
import ref from './ref'
import View from './View'

const marks = {
  '#': heading,
  '##': heading,
  '[]': ref,
  '![]()': image,
}

let lastId

const gang = () => {
  if (document.documentElement.clientWidth > 767) return
  const nav = document.querySelector('nav.navbar')
  const dialog = document.querySelector(`div.${styles.dialog}`)
  const words = dialog.querySelector('div.words')
  const elements = dialog.querySelectorAll(`span.highlight`)
  if (!elements) return

  const minHeight = nav.offsetHeight + words.offsetHeight
  const maxHeight = minHeight + (document.documentElement.clientHeight - minHeight) * 0.3
  const candidates = []
  elements.forEach((ele) => {
    const { top, bottom } = ele.getBoundingClientRect()
    if (top > minHeight && bottom < maxHeight) candidates.push(ele)
  })
  const word = candidates[candidates.length - 1]
  if (word && word !== lastId) word.click()
  lastId = word
}

export default function Dialog({ children }) {
  const lexemes = useMemo(() => new Cmd(children).run(), [children])
  useEffect(() => {
    gang()
    window.addEventListener('scroll', gang)
    return () => window.removeEventListener('scroll', gang)
  }, [])
  return (
      <div className={styles.dialog}>
        <View lexemes={lexemes} marks={marks} />
      </div>
  )
}

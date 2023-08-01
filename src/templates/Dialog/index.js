import React, { useEffect } from 'react'

import styles from './styles.module.css'
import Bubble from '../../components/Bubble'
import Cmd from '../../cmd'
import Image from '../../components/Image'

function Heading({ lexeme, ...rest }) {
  const [token] = lexeme
  const { text } = token
  return <Bubble {...rest} right={text === '##'} />
}

function Img({ lexeme }) {
  const [token] = lexeme
  const { text } = token
  const [, alt, src] = /^!\[(.*)]\((.+)\)$/.exec(text)
  return <Image alt={alt} src={src} ratio={0.5} />
}

const marks = {
  'heading': Heading,
  'image': Img,
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

export default function Dialog(props) {
  useEffect(() => {
    gang()
    window.addEventListener('scroll', gang)
    return () => window.removeEventListener('scroll', gang)
  }, [])
  return (
      <div className={styles.dialog}>
        <Cmd marks={marks}>{props.children}</Cmd>
      </div>
  )
}

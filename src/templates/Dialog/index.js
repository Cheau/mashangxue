import React from 'react'

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

export default function Dialog(props) {
  return (
      <div className={styles.dialog}>
        <Cmd marks={marks}>{props.children}</Cmd>
      </div>
  )
}

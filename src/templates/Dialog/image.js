import React from 'react'

import Image from '../../components/Image'

const image = (token) => function Img({ lexeme }) {
  const { text } = token
  const [, alt, src] = /^!\[(.*)]\((.+)\)$/.exec(text)
  return <Image alt={alt} src={src} ratio={0.5} />
}

export default image

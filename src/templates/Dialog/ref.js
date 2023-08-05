import React from 'react'

import Highlight from '../../components/Highlight'

const ref = (token, global) => {
  const {text} = token
  const [word, ...rest] = text.substring(1, text.length - 1).split('/')
  const [variant, origin = variant] = word.split(':')
  const {words} = global
  words.push({
    text: `${origin}/${rest.join('/')}`,
    word: origin,
  })
  const isOdd = words.length % 2 === 1
  words[words.length - 1].color = isOdd ? 'green' : 'yellow'
  return function Ref() {
    return (
        <Highlight green={isOdd} yellow={!isOdd} onClick={() => {
          const e = document.getElementById(origin || variant)
          if (e) e.parentElement.scrollTo(
              {top: 0, left: e.offsetLeft - 20, behavior: 'smooth'})
        }}>
          {variant}
        </Highlight>
    )
  }
}

export default ref

import MDXComponents from '@theme-original/MDXComponents'

import Alphabet from '@site/src/components/Alphabet'
import Box from '@site/src/components/Box'
import Dialog from '@site/src/templates/Dialog'
import Image from '@site/src/components/Image'
import Pangram from '@site/src/components/Pangram'
import Player from '@site/src/components/Player'
import ScDc from '@site/src/components/Frame/sc/dc'
import WordCard from '@site/src/components/WordCard'

function LifeWord(props) {
  return <WordCard {...props} topic="生活处处学英语" />
}

export default {
  ...MDXComponents,
  Alphabet,
  Box,
  Dialog,
  Image,
  LifeWord,
  Pangram,
  Player,
  ScDc,
  WordCard,
}

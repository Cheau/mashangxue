import MDXComponents from '@theme-original/MDXComponents'

import Alphabet from '@site/src/components/Alphabet'
import Box from '@site/src/components/Box'
import Bubble, { BubbleLeftNote, BubbleRightNote } from '@site/src/components/Bubble'
import Cmd from '@site/src/cmd'
import Dialog from '@site/src/templates/Dialog'
import DailyConversation from '@site/src/components/Frame/studio-classroom/daily-conversation'
import Highlight from '@site/src/components/Highlight'
import Image from '@site/src/components/Image'
import Pangram from '@site/src/components/Pangram'
import Player from '@site/src/components/Player'

export default {
  ...MDXComponents,
  alphabet: Alphabet,
  box: Box,
  bubble: Bubble,
  bln: BubbleLeftNote,
  brn: BubbleRightNote,
  cmd: Cmd,
  hl: Highlight,
  image: Image,
  pangram: Pangram,
  player: Player,
  'sc-dc': DailyConversation,
  dialog: Dialog,
}

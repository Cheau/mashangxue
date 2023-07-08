import React from 'react'

import styles from './styles.module.css'
import Bubble from '../../components/Bubble'
import Cmd from '../../cmd'

function Right(props) {
  return <Bubble {...props} right />
}

const marks = {
  '#': Bubble,
  '##': Right,
}

export default function Dialog(props) {
  return (
      <div className={styles.dialog}>
        <Cmd marks={marks}>{props.children}</Cmd>
      </div>
  )
}

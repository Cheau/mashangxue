import React, { useState } from 'react'
import clsx from 'clsx'

import styles from './papers.module.css'
import { useSession } from '../common/hooks'
import Checkbox from '../components/Checkbox'


export default function Papers() {
  const size = 17
  const init = (defaultValue) => Array(size).fill(defaultValue)
  const [editable, setEditable] = useState(false)
  const [choices, setChoices] = useSession('papers.choices', init(false))
  const [texts, setTexts] = useSession('papers.texts', init(undefined))
  const onReset = () => {
    setChoices(init(false))
    setTexts(init(undefined))
  }
  const onChange = (arr, setter) => (i, val) => {
    arr[i] = val
    setter([...arr])
  }
  const onCheck = onChange(choices, setChoices)
  const onText = onChange(texts, setTexts)
  const boxes = Array(size).fill(null).map((item, i) => (
      <Checkbox
        key={i} checked={choices[i]} editable={editable}
        index={i + 1} text={texts[i]}
        onCheck={(val) => onCheck(i, val)} onText={(val) => onText(i, val)}
      />
  ))
  return (
    <div className={styles.checkboxes}>
      <div className={styles.actions}>
        <button
          className={clsx(styles.stateful, { [styles.active]: editable })}
          onClick={() => setEditable(!editable)}
        >Edit</button>
        <button onClick={onReset}>Reset</button>
      </div>
      <div className={styles.boxes}>
        {boxes}
      </div>
    </div>
  )
}

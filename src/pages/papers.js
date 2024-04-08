import React, { useEffect, useState } from 'react'
import clsx from 'clsx'

import styles from './papers.module.css'
import { useSession } from '../common/hooks'
import Checkbox from '../components/Checkbox'

const count = (choices = []) => choices.reduce((sum, value) => value ? sum + 1 : sum, 0)

export default function Papers() {
  const size = 17
  const init = (defaultValue) => Array(size).fill(defaultValue)
  const [editable, setEditable] = useState(false)
  const [choices, setChoices] = useSession('papers.choices', init(false))
  const [texts, setTexts] = useSession('papers.texts', init(undefined))
  const [sum, setSum] = useState(() => count(choices))
  const onToggle = () => !editable && setChoices(init(sum !== choices.length))
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
        key={i} checked={choices[i]} editable={editable} highlight={true}
        index={i + 1} text={texts[i]}
        onCheck={(val) => onCheck(i, val)} onText={(val) => onText(i, val)}
      />
  ))
  useEffect(() => setSum(count(choices)), [choices])
  return (
    <div className={styles.checkboxes}>
      <div className={styles.actions}>
        <div className={styles.central}>
          <Checkbox
            checked={sum !== 0}
            partial={sum < choices.length}
            index={sum === 0 ? undefined : sum}
            onCheck={onToggle}
            text={false}
          />
          <div>
            <button
              className={clsx(styles.stateful, { [styles.active]: editable })}
              onClick={() => setEditable(!editable)}
            >Edit</button>
            <button onClick={onReset}>Reset</button>
          </div>
        </div>
      </div>
      <div className={styles.central}>
        <div className={styles.boxes}>
          {boxes}
        </div>
      </div>
    </div>
  )
}

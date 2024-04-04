import React from 'react'
import clsx from 'clsx'

import styles from './styles.module.css'

const placehold = (text) => text && text.length ? text : 'empty...'

export default function Checkbox({
  checked = false,
  editable = false,
  index,
  text,
  onCheck = (val) => val,
  onText = (val) => val,
}) {
  const check = (e) => {
    e.preventDefault()
    if (!editable) onCheck(!checked)
  }
  const input = (e) => onText(e.target.innerText)
  const checkClasses = clsx('check', styles.check, {
    [styles.checked]: checked,
  })
  const textClasses = clsx('text', styles.text, {
    [styles.empty]: !text,
  })
  return (
    <label className={clsx('checkbox', styles.checkbox, { [styles.texting]: editable })} onClick={check}>
      <span className={styles.index}>{index}</span>
      <input
        className={checkClasses}
        type='checkbox'
      />
      <div
        className={textClasses}
        contentEditable={editable}
        onBlur={input}
      >
        {editable ? text : placehold(text)}
      </div>
    </label>
  )
}

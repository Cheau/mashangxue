import React from 'react'
import clsx from 'clsx'

import styles from './styles.module.css'

const placehold = (text) => text && text.length ? text : 'empty...'

export default function Checkbox({
  checked = false,
  editable = false,
  highlight = false,
  partial = false,
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
  const classes = clsx('checkbox', styles.checkbox, {
    [styles.highlight]: highlight,
    [styles.texting]: text !== false && editable,
  })
  const indexClasses = clsx('index', styles.index, {
    [styles.empty]: index === undefined || index === null || index === '',
  })
  const checkClasses = clsx('check', styles.check, {
    [styles.checked]: checked,
    [styles.partial]: partial,
  })
  const textClasses = clsx('text', styles.text, {
    [styles.empty]: !text,
  })
  return (
    <label className={classes} onClick={check}>
      <span className={indexClasses}>{index}</span>
      <input
        className={checkClasses}
        type='checkbox'
      />
      {text !== false && <div
        className={textClasses}
        contentEditable={editable}
        onBlur={input}
      >
        {editable ? text : placehold(text)}
      </div>}
    </label>
  )
}

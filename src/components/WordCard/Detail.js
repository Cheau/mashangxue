import React, { useMemo } from 'react'
import clsx from 'clsx'

import styles from './Detail.module.css'
import colors from './shared/colors.module.css'

function Blank() {
  return <div className="blank" />
}

function highlight(key, text, className) {
  return <span key={key} className={className}>{text}</span>
}

let count
function toText(src) {
  const result = []
  if (Array.isArray(src)) {
    const last = src.length - 1
    for (let i = 0; i < last; i++) {
      result.push(toText(src[i]))
      result.push(<Blank key={i} />)
    }
    result.push(toText(src[last]))
    return result
  }
  const { children } = src.props
  let start = 0
  for (let i = 0, bracket; i < children.length; i++) {
    if (children[i] === '[') {
      result.push(children.substring(start, i))
      start = i + 1
      bracket = true
    } else if (children[i] === ']' && bracket) {
      const className = Math.floor(count++ / 2) % 2 === 0 ? colors.blue : colors.pink
      const element = highlight(i, children.substring(start, i), className)
      result.push(element)
      start = i + 1
      bracket = false
    }
  }
  if (!result.length) return children
  if (start < children.length) result.push(children.substring(start, children.length))
  return result
}

export default function Detail(props) {
  const children = useMemo(() => {
    count = 0
    return toText(props.children)
  }, [props.children])
  return <div className={clsx('detail', styles.detail)}>{children}</div>
}
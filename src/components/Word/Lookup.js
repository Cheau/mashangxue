import React, { useCallback, useEffect, useState } from 'react'

import styles from './styles.module.css'
import Modal from '../Modal'
import Word from '.'

const read = (e) => {
  const text = e.type === 'lookup' ? e.detail.word : document.getSelection().toString()
  return text ? text.trim() : null
}

const isEnglish = (text) => /[0-9a-zA-Z -]+/.exec(text)

function History({ children, current, onClick }) {
  const words = []
  for (let i = children.length - 1; i >= 0; i--) {
    const className = current === i ? styles.current : styles.pill
    words.push((
        <span key={i} className={className} onClick={() => onClick(i)}>
          {children[i]}
        </span>
    ))
  }
  return <div className={styles.history}>{words}</div>
}

export default function Lookup() {
  const [history, setHistory] = useState([])
  const [current, setCurrent] = useState()
  useEffect(() => {
    const lookup = (e) => {
      const text = read(e)
      if (!text || text === history[history.length - 1]) return
      if (!isEnglish(text)) return
      setHistory([...history, text])
      setCurrent(history.length)
    }
    document.addEventListener('pointerout', lookup)
    document.addEventListener('pointerup', lookup)
    document.addEventListener('lookup', lookup)
    return () => {
      document.removeEventListener('pointerout', lookup)
      document.removeEventListener('pointerup', lookup)
      document.removeEventListener('lookup', lookup)
    }
  }, [history])
  const onClose = useCallback(() => {
    setHistory([])
    setCurrent()
  }, [])
  if (current === undefined) return null
  return (
      <Modal open={true} onClose={onClose}>
        <div className={styles.lookup}>
          <History current={current} onClick={(i) => setCurrent(i)}>{history}</History>
          <Word card="lookup">
            {history[current]}
          </Word>
        </div>
      </Modal>
  )
}

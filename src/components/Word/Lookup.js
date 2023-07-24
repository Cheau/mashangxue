import React, { useCallback, useEffect, useState } from 'react'

import styles from './styles.module.css'
import Modal from '../Modal'
import Word from '.'

const read = (e) => {
  const text = e.type === 'lookup' ? e.detail.word : document.getSelection().toString()
  return text ? text.trim() : null
}

export default function Lookup() {
  const [history, setHistory] = useState([])
  const [word, setWord] = useState()
  useEffect(() => {
    const lookup = (e) => {
      const text = read(e)
      if (!text) return
      setHistory([...history, text])
      setWord(text)
    }
    document.addEventListener('selectionchange', lookup)
    document.addEventListener('lookup', lookup)
    return () => {
      document.removeEventListener('selectionchange', lookup)
      document.removeEventListener('lookup', lookup)
    }
  }, [history])
  const onClose = useCallback(() => {
    setHistory([])
    setWord()
  }, [])
  console.log(history)
  if (!word) return null
  return (
      <Modal open={true} onClose={onClose}>
        <div className={styles.lookup}>
          <Word card="lookup">
            {word}
          </Word>
        </div>
      </Modal>
  )
}

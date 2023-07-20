import React, { useContext } from 'react'
import { BiExpand, BiSolidCaretDownCircle, BiSolidCaretUpCircle } from 'react-icons/bi'

import styles from "./styles.module.css"
import { CardContext, WordContext } from './withProviders'

export default function Actions({
  onMaximize = () => {},
}) {
  const { card, setCard } = useContext(CardContext)
  const { partOfSpeech } = useContext(WordContext)
  if (card === 'lookup') return null
  return (
      <div className={styles.actions}>
        {card === 'compact' && <BiSolidCaretDownCircle
            onClick={() => setCard('completed')}
            title="展开更多释义" />
        }
        {partOfSpeech && card === 'completed' &&  <BiSolidCaretUpCircle
            onClick={() => setCard('compact')}
            title="显示当前释义" />
        }
        <BiExpand onClick={onMaximize} title="最大化" />
      </div>
  )
}

import React, { useState } from 'react'

import Alphabet from '../Alphabet'
import Game from '../Game'

const intro = 'Pangram是指在一个有意义的句子中，包含字母表里的所有字母至少一次，且字母总数越少越好。' +
    '它通常被用于展示字体和测试设备等。' +
    '例如下面这个短句就包含全部字母且长度仅为35。\n' +
    '你来试着写出更短的句子吧！'

const sample = 'The quick brown fox jumps over the lazy dog'

export default function Pangram() {
  const [value = '', setValue] = useState(sample)
  const alphabet = Array(26).fill({ count: 0 })
  const lowerCased = value.toLowerCase()
  let total = 0
  for (let i = 0; i < lowerCased.length; i++) {
    const j = lowerCased.charCodeAt(i) - 97
    if (j < 0 || j > 25) continue
    const { count } = alphabet[j]
    alphabet[j] = { color: 'green', count: count + 1 }
    total += 1
  }
  return (
      <Game title="Pangram" subtitle="(全字母短句)"
            intro={intro}>
        <textarea
            onChange={(e) => setValue(e.target.value)}
            rows={3}
            value={value}
            style={{
              width: '100%',
              fontSize: '24px',
            }}
        />
        <Alphabet letterCase="lower" states={alphabet} />
        {total ? <div style={{ textAlign: 'center' }}>
          ——共包含<b style={{ color: 'green' }}>{total}</b>个字母——
        </div> : null}
      </Game>
  )
}

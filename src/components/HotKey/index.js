import React, { useEffect } from 'react'

import * as arrayOfDefs from './defs'

const buildKey = (keys) => {
  const {
    altKey = false, ctrlKey = false, metaKey = false, shiftKey = false,
  } = keys
  let modifier = altKey ? 1 : 0
  modifier = modifier << 1 | (ctrlKey ? 1 : 0)
  modifier = modifier << 1 | (metaKey ? 1 : 0)
  modifier = modifier << 1 | (shiftKey ? 1 : 0)
  return `${modifier}-${keys.key}`
}

const defs = Object.values(arrayOfDefs)
    .flat()
    .reduce((json, def) => {
      const key = buildKey(def.keys)
      if (json[key]) throw new Error(`Key collision: ${key}!`)
      json[key] = def.callback
      return json
    }, {})

export default function HotKey() {
  useEffect(() => {
    const onKeyPress = (e) => {
      const key = buildKey(e)
      if (defs[key]) defs[key]()
    }
    document.addEventListener('keypress', onKeyPress)
    return () => document.removeEventListener('keypress', onKeyPress)
  }, [])
  return null
}

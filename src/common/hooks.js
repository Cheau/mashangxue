import { useEffect, useState } from 'react'

import { getSessionStorage } from './store'

export const useSession = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const str = getSessionStorage().getItem(key)
    if (!str) return defaultValue
    try {
      return JSON.parse(str)
    } catch (e) {
      return str
    }
  })
  useEffect(() => {
    getSessionStorage().setItem(key, typeof value === 'object' ? JSON.stringify(value) : value)
  }, [value])
  return [value, setValue]
}

export default {
  useSession,
}

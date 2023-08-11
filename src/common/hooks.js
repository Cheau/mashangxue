import { useEffect, useState } from 'react'

export const useSession = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const str = sessionStorage.getItem(key)
    if (str === undefined) return defaultValue
    try {
      return JSON.parse(str)
    } catch (e) {
      return str
    }
  })
  useEffect(() => {
    sessionStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value)
  }, [value])
  return [value, setValue]
}

export default {
  useSession,
}

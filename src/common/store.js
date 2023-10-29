import { hookstate } from '@hookstate/core'
import { localstored } from '@hookstate/localstored'

const localStorage = (function () {
  const data = {}
  return {
    getItem: (key) => {
      return data[key]
    },
    setItem: (key, value) => {
      data[key] = value
    },
    removeItem: (key) => {
      delete data[key]
    },
  }
})()

const local = (key) => {
  const engine = typeof window === 'undefined' ? localStorage : window.localStorage
  return localstored({ key, engine })
}

export const presenting = hookstate(false, local('presenting'))

export default {
  presenting
}

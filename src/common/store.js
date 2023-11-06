import { hookstate } from '@hookstate/core'
import { localstored } from '@hookstate/localstored'

const storage = function () {
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
}


const localStorage = storage()
export function getLocalStorage() {
  return typeof window === 'undefined' ? localStorage : window.localStorage
}

const sessionStorage = storage()
export function getSessionStorage() {
  return typeof window === 'undefined' ? sessionStorage : window.sessionStorage
}

const local = (key) => {
  const engine = getLocalStorage()
  return localstored({ key, engine })
}

export const presenting = hookstate(false, local('presenting'))

export default {
  presenting
}

import { hookstate } from '@hookstate/core'
import { localstored } from '@hookstate/localstored'

const localStorage = {
  data: {},
  getItem: (key) => this.data[key],
  setItem: (key, value) => this.data[key] = value,
  removeItem: (key) => delete this.data[key],
}

const local = (key) => {
  const engine = typeof window === 'undefined' ? localStorage : window.localStorage
  return localstored({ key, engine })
}

export const presenting = hookstate(false, local('presenting'))

export default {
  presenting
}

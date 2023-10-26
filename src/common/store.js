import { hookstate } from '@hookstate/core'

const withSession = (key, initial) => {
  if (typeof sessionStorage === 'undefined') return hookstate(initial)
  return hookstate(sessionStorage.getItem(key) ?? initial)
}

export const presenting = withSession('presenting', false)

export default {
  presenting
}

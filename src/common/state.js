import { useHookstate } from '@hookstate/core'

import { presenting } from './store'

export const usePresenting = () => useHookstate(presenting)

export default {
  usePresenting,
}

import { hookstate } from '@hookstate/core'
import { localstored } from '@hookstate/localstored'

export const presenting = hookstate(false, localstored({ key: 'presenting' }))

export default {
  presenting
}

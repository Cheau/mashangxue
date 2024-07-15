import derived, { computers } from './derived'
import { playlists } from './fixed'
import stored, { patch } from './stored'

let timeoutId
const tick = () => {
  if (timeoutId) clearTimeout(timeoutId)
  const state = stored.get()
  const { list, rangeIndex } = locate(state)
  const value = {}
  if (list !== state.list) value.list = list
  if (rangeIndex !== state.rangeIndex) value.rangeIndex = rangeIndex
  if (playlists[list].indexOf(state.file) < 0 && value.file !== playlists[list][0]) {
    value.file = playlists[list][0]
  }
  patch(value)
  timeoutId = setTimeout(tick, 1000)
}
tick()

const toArray = (obj, keys) => {
  if (typeof obj !== 'object') return keys.map(() => undefined)
  return keys.map((key) => obj[key])
}
const compute = () => {
  const { list, order, settings: data = {} } = stored.get(noproxy)
  const settings = list === 'all' ?
    order.flatMap((o) => toArray(data[o], playlists[o])) :
    toArray(data[list], playlists[list])
  const playlist = playlists[list].filter((item, i) => !settings[i]?.disabled)
  derived.merge({ playlist, settings: settings.filter((item) => !item?.disabled) })
}

stored.list.subscribe(compute)
stored.order.subscribe(compute)
stored.settings.subscribe(computers.settings)

import { playlists } from './fixed'
import stored, { locate, patch } from './stored'

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

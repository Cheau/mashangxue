import derived from './derived'
import stored, { locate, noproxy, patch } from './stored'

const pick = (pickedList, pickedFile) => {
  const state = stored.get(noproxy)
  const { playlists } = derived.get(noproxy)
  const timed = state.timed && pickedList === state.list
  const { list, rangeIndex } = timed ? locate(state) : { list: pickedList }
  patch({
    file: pickedFile ?? playlists[list][0],
    list,
    rangeIndex,
    timed,
  })
}

const playByTime = () => {
  const state = stored.get(noproxy)
  const { playlists } = derived.get(noproxy)
  const timed = true
  const { list, rangeIndex } = locate({ ...state, timed })
  const file = playlists[list][0]
  patch({
    file,
    list,
    rangeIndex,
    timed,
  })
}

const restore = () => stored.set(getInitStore())

const set = (list, file, option, value) => {
  const { settings = {} } = stored.get(noproxy)
  if (!settings[list]) settings[list] = {}
  if (!settings[list][file]) settings[list][file] = {}
  settings[list][file][option] = value
  patch({ settings })
}

let timeoutId

const tick = () => {
  const { playlists } = derived.get(noproxy)
  const state = stored.get()
  const { list, rangeIndex } = locate(state)
  const value = {}
  if (list !== state.list) value.list = list
  if (rangeIndex !== state.rangeIndex) value.rangeIndex = rangeIndex
  if (playlists[list].indexOf(state.file) < 0 && playlists[list].length) {
    value.file = playlists[list][0]
  }
  patch(value)
  timeoutId = setTimeout(tick, 1000)
}

const untick = () => {
  if (timeoutId) clearTimeout(timeoutId)
}

export default {
  pick, playByTime, restore, set, tick, untick,
}

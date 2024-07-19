import derived from './derived'
import stored, {
  getInitStore,
  locate,
  noproxy,
  patch,
} from './stored'

export const pick = (pickedList, fileOrIndex) => {
  const all = pickedList === 'all'
  const store = stored.get(noproxy)
  const timed = store.timed && pickedList === store.list
  let { list, rangeIndex } = timed ? locate(store) : {}
  const { playlists } = derived.get(noproxy)
  if (list === undefined) {
    const getList = () => {
      if (!all) return pickedList
      const { order } = store
      if (typeof fileOrIndex !== 'number') return store.file ? store.list : order[0]
      let sum = 0
      return order.find((o) => {
        sum += playlists[o].length
        return sum > fileOrIndex
      })
    }
    list = getList()
  }
  let file
  if (fileOrIndex === undefined) file = all ? store.file : playlists[pickedList][0]
  if (typeof fileOrIndex === 'number') file = playlists[pickedList][fileOrIndex]
  if (typeof fileOrIndex === 'string') file = fileOrIndex
  patch({
    all,
    file,
    list,
    rangeIndex,
    timed,
  })
}

export const playByTime = () => {
  const store = stored.get(noproxy)
  const { playlists } = derived.get(noproxy)
  const timed = true
  const { list, rangeIndex } = locate({ ...store, timed })
  const file = playlists[list][0]
  patch({
    all: false,
    file,
    list,
    rangeIndex,
    timed,
  })
}

export const restore = () => stored.set(getInitStore())

export const set = (list, file, option, value) => {
  const { settings = {} } = stored.get(noproxy)
  if (!settings[list]) settings[list] = {}
  if (!settings[list][file]) settings[list][file] = {}
  settings[list][file][option] = value
  patch({ settings })
}

let timeoutId

export const tick = () => {
  const store = stored.get(noproxy)
  if (store.timed) {
    const { playlists } = derived.get(noproxy)
    const { list, rangeIndex } = locate(store)
    const value = {}
    if (list !== store.list) value.list = list
    if (rangeIndex !== store.rangeIndex) value.rangeIndex = rangeIndex
    if (playlists[list].indexOf(store.file) < 0 && playlists[list].length) {
      value.file = playlists[list][0]
    }
    patch(value)
  }
  timeoutId = setTimeout(tick, 1000)
}

export const untick = () => {
  if (timeoutId) clearTimeout(timeoutId)
}

export default {
  pick, playByTime, restore, set, tick, untick,
}

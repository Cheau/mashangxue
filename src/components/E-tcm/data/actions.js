import stored, { locate, noproxy, patch } from './stored'

const pick = (pickedList, pickedFile) => {
    const state = stored.get(noproxy)
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
  
  export default {
    pick, playByTime, restore, set,
 }

import { hookstate } from '@hookstate/core'
import { subscribable } from '@hookstate/subscribable'

import fixed from './fixed'
import stored, { noproxy, patch } from './stored'

const getFileIndex = (playlists) => {
  const {
    all, file, list, order,
  } = stored.get(noproxy)
  if (!playlists || !list || !file) return
  let base = 0
  if (all) {
    order.slice(0, order.indexOf(list)).every((o) => base += playlists[o].length)
  }
  return base + playlists[list].indexOf(file)
}

const getPlaylists = () => {
  const { all, order, settings = {} } = stored.get(noproxy)
  const value = Object.entries(fixed.playlists).reduce((accumulator, [list, files]) => {
    const setting = settings[list] ?? {}
    accumulator[list] = files.filter((f) => !setting[f]?.disabled)
    return accumulator
  }, {})
  if (all) value.all = order.flatMap((o) => value[o])
  return value
}

const getSettings = (playlists) => {
  const { all, order, settings = {} } = stored.get(noproxy)
  const value = order.reduce((accumulator, list) => {
    accumulator[list] = playlists[list].map((f) => (settings[list] ?? {})[f])
    return accumulator
  }, {})
  if (all) value.all = order.flatMap((o) => value[o])
  return value
}

const derived = hookstate({
  fileIndex: undefined,
  playlists: undefined,
  settings: undefined,
}, subscribable())

export default derived

const setPlaylists = () => derived.playlists.set(getPlaylists())
const setSettings = () => derived.settings.set(getSettings(derived.playlists.get()))
const setFileIndex = () => {
  const fileIndex = getFileIndex(derived.playlists.get())
  derived.fileIndex.set(fileIndex)
  if (fileIndex < 0) patch({ file: undefined })
}

stored.all.subscribe(setPlaylists)
stored.order.subscribe(setPlaylists)
stored.settings.subscribe(setPlaylists)
stored.file.subscribe(setFileIndex)
stored.list.subscribe(setFileIndex)
derived.playlists.subscribe(setSettings)
derived.playlists.subscribe(setFileIndex)

setPlaylists()
setSettings()
setFileIndex()

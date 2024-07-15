import { hookstate } from '@hookstate/core'
import { subscribable } from '@hookstate/subscribable'

import fixed from './fixed'
import stored, { noproxy } from './stored'

const getFileIndex = (playlists) => {
  const { file, list } = stored.get(noproxy)
  if (!playlists || !list) return
  return playlists[list].indexOf(file)
}

const getPlaylists = () => {
  const { settings = {} } = stored.get(noproxy)
  return Object.entries(fixed.playlists).reduce((accumulator, [list, files]) => {
    const setting = settings[list] ?? {}
    accumulator[list] = files.filter((f) => !setting[f]?.disabled)
    return accumulator
  }, {})
}

const getSettings = (playlists) => {
  const { order, settings = {} } = stored.get(noproxy)
  return order.reduce((accumulator, list) => {
    accumulator[list] = playlists[list].map((f) => (settings[list] ?? {})[f])
    return accumulator
  }, {})
}

const init = () => {
  const initial = {}
  initial.playlists = getPlaylists()
  initial.settings = getSettings(initial.playlists)
  initial.fileIndex = getFileIndex(initial.playlists)
  return initial
}

const derived = hookstate(init(), subscribable())

export default derived

const setPlaylists = () => derived.playlists.set(getPlaylists())
const setSettings = () => derived.settings.set(getSettings(derived.playlists.get()))
const setFileIndex = () => derived.fileIndex.set(getFileIndex(derived.playlists.get()))

stored.settings.subscribe(setPlaylists)
stored.settings.subscribe(setSettings)
stored.file.subscribe(setFileIndex)
stored.list.subscribe(setFileIndex)
derived.playlists.subscribe(setFileIndex)

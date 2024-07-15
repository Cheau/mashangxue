import { playlists } from './fixed'
import stored, { noproxy } from './stored'

const derived = hookstate({
  fileIndex: undefined,
  playlists: undefined,
  settings: undefined,
})

export default derived

const fileIndex = () => {
  const { file, list } = stored.get(noproxy)
  const { playlists } = derived.get(noproxy)
  const value = playlists[list].indexOf(file)
  derived.fileIndex.set(value)
}

const playlists = () => {
  const { settings } = stored.get(noproxy)
  const value = Object.entries(playlists).reduce((accumulator, [list, files]) => {
    const setting = settings[list] ?? {}
    accumulator[list] = files.filter((f) => !setting[f]?.disabled)
    return accumulator
  }, {})
  derived.playlists.set(value)
}

const settings = () => {
  const { settings } = stored.get(noproxy)
  const value = Object.entries(settings).reduce((accumulator, [list, setting]) => {
    accumulator[list] = setting.filter((s) => !s?.disabled)
    return accumulator
  }, {})
  derived.settings.set(value)
}

export const computers = {
  fileIndex, playlists, settings,
}

playlists()
settings()
fileIndex()

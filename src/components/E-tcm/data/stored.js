import { extend, hookstate } from '@hookstate/core'
import { localstored } from '@hookstate/localstored'
import { subscribable } from '@hookstate/subscribable'

const clone = (json) => JSON.parse(JSON.stringify(json))

const store = {
  file: undefined,
  list: undefined,
  order: [
    'heart', 'spleen', 'kidney', 'lung', 'liver',
  ],
  rangeIndex: undefined,
  ranges: {
    all: [],
    heart: [['12:30', '13:00'], ['22:00', '23:00']],
    spleen: [['07:00', '09:00'], ['11:00', '13:00'], ['17:00', '19:00']],
    kidney: [['07:00', '11:00']],
    lung: [['15:00', '19:00']],
    liver: [['19:00', '23:00']],
    off: ['还没到点'],
  },
  settings: undefined,
  timed: true,
}

export const noproxy = { noproxy: true }

const now = () => {
  const date = new Date()
  return `${padTime(date.getHours())}:${padTime(date.getMinutes())}`
}

const within = (time, [start, end]) => {
  if (start <= end) return start <= time && time < end
  return (start <= time && time <= '23:59') || (0 <= time && time < end)
}

export const locate = (state) => {
  const {
    list, order, rangeIndex, ranges, timed,
  } = state
  if (!timed) return { list, rangeIndex }
  const time = now()
  for (let i = 0; i < order.length; i++) {
    const arr = ranges[order[i]]
    for (let j = 0; j < arr.length; j++) {
      if (within(time, arr[j])) return { list: order[i], rangeIndex: j }
    }
  }
  return { list: 'off', rangeIndex: 0 }
}

const getInitStore = () => {
  const merged = {
    ...store,
    ...locate(store),
  }
  return clone(merged)
}

const extensions = [subscribable()]
if (typeof window !== 'undefined') extensions.push(localstored({ key: 'e-tcm' }))
const stored = hookstate(getInitStore(), extend(...extensions))

export const patch = (object) => {
  Object.entries(object).forEach(([key, value]) => stored[key].set(value))
}

export default stored

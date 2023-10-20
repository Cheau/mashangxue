import { presenting } from '../../../common/store'

const on = () => presenting.set(true)

const off = () => presenting.set(false)

const presentation = [{
  keys: {
    ctrlKey: true,
    key: 'p',
  },
  callback: on,
}, {
  keys: {
    ctrlKey: true,
    key: 'P',
    shiftKey: true,
  },
  callback: off,
}]

export default presentation

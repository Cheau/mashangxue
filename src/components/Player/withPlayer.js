import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import { Howl } from 'howler'

import { filename } from '../../common/path'

const box = (source) => {
  if (typeof source === 'string') return [{ howl: null, src: source, title: filename(source) }]
  if (Array.isArray(source)) return source.map((src) => ({ howl: null, src, title: filename(src) }))
  return []
}

const withPlayer = (Component, typedOpts = {}) => forwardRef(function Player(props, ref) {
  const {
    defaultValue, onChange = (k, v) => {}, src, value,
  } = props
  const playlist = useMemo(() => box(src), [src])
  const [opts, setOpts] = useState({})
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
  const index = defaultValue ? uncontrolledValue : value
  const setIndex = defaultValue ? setUncontrolledValue : (i) => onChange('index', i)
  const [playing, setPlaying] = useState(false)
  const [audio, setAudio] = useState()
  const [elapsed, setElapsed] = useState(0, [audio])
  const [status, setStatus] = useState(() => audio?.state(), [audio])
  const duration = audio?.howl?.duration() || 0

  function step() {
    const sound = this
    setElapsed(Math.trunc(sound.seek() * 10) / 10)
    if (sound.playing()) requestAnimationFrame(step.bind(sound))
  }

  const preprocess = (func, create = false) => (...args) => {
    const e = args[0]
    if (e && Object.prototype.hasOwnProperty.call(e, 'stopPropagation')) e.stopPropagation()
    if (!audio) return
    if (audio.howl) {
      func(audio.howl, ...args)
    } else if (create) {
      const options = {
        preload: false,
        ...typedOpts,
        ...opts,
        src: audio.src,
        onend: () => setStatus('ended'),
        onpause: () => setStatus('paused'),
        onplay: function () {
          setStatus('playing')
          requestAnimationFrame(step.bind(this))
        },
        onseek: function () {
          requestAnimationFrame(step.bind(this))
        },
        onstop: () => setStatus('stopped'),
      }
      const sound = new Howl(options)
      audio.howl = sound
      if (sound.state() === 'unloaded') sound.load()
      sound.once('load', sound.play)
    }
  }
  const pause = preprocess((sound) => sound.pause())
  const play = preprocess((sound) => sound.play(), true)
  const stop = preprocess((sound) => sound.stop())
  const pick = preprocess((sound, next) => {
    if (next === index && !sound.playing()) play()
    setIndex(next)
  })
  const seek = preprocess((sound, value) => {
    if (sound.playing()) {
      sound.seek(value)
    }
  })
  const actions = {
    pause,
    play,
    pick,
    seek,
    stop,
  }
  useImperativeHandle(ref, () => actions, [audio])

  useEffect(() => {
    stop()
    setAudio(playlist[index])
  }, [playlist, index])
  useEffect(() => {
    setPlaying(status === 'playing')
    onChange('status', status)
  }, [status])
  useEffect(() => {
    if (playing) play()
  }, [audio])
  return <Component
    {...props}
    actions={actions}
    duration={duration}
    elapsed={elapsed}
    index={index}
    setOpts={setOpts}
    status={status}
  />
})

export default withPlayer

import React, {
  forwardRef,
  useCallback,
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
  const [autoplay, setAutoplay] = useState(props.autoplay)
  const playlist = useMemo(() => box(src), [src])
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
  const index = defaultValue ? uncontrolledValue : value
  const setIndex = defaultValue ? setUncontrolledValue : (i) => onChange('index', i)
  const [audio, setAudio] = useState()
  const [elapsed, setElapsed] = useState(0)
  const [status, setStatus] = useState(() => audio?.state())
  const duration = audio?.howl?.duration()

  const step = useCallback(() => {
    const sound = audio?.howl
    if (!sound) {
      setElapsed(0)
      return
    }
    setElapsed(Math.trunc(sound.seek() * 10) / 10)
    if (sound.playing()) requestAnimationFrame(step)
  }, [audio])

  const preprocess = (func, { create = false, play = false } = {}) => (...args) => {
    const e = args[0]
    if (typeof e === 'object' && typeof e.stopPropagation === 'function') {
      e.stopPropagation()
      setAutoplay(play)
    }
    if (!audio) return
    if (!audio.howl && create) {
      const options = {
        preload: false,
        ...typedOpts,
        src: audio.src,
        onend: () => setStatus('ended'),
        onpause: () => setStatus('paused'),
        onplay: () => setStatus('playing'),
        onseek: () => requestAnimationFrame(step),
        onstop: () => setStatus('stopped'),
      }
      audio.howl = new Howl(options)
    }
    if (audio.howl) func(audio.howl, ...args)
  }
  const pause = preprocess((sound) => sound.pause())
  const play = preprocess((sound) => {
    if (sound.state() === 'unloaded') {
      sound.load()
      sound.once('load', sound.play)
      setStatus(sound.state())
    } else if (!sound.playing()) {
      sound.play()
    }
  }, { create: true, play: true })
  const stop = preprocess((sound) => sound.stop())
  const pick = (event, i) => {
    if (event) setAutoplay(true)
    setIndex(i)
  }
  const seek = preprocess((sound, value) => sound.seek(value))
  const actions = {
    pause,
    play,
    pick,
    seek,
    setAutoplay,
    stop,
  }
  useImperativeHandle(ref, () => actions, [audio])

  useEffect(() => {
    stop()
    setAudio(playlist[index])
  }, [playlist, index])
  useEffect(() => {
    step()
    onChange('status', status)
  }, [status])
  useEffect(() => {
    if (!audio) return
    if (autoplay) play()
  }, [audio])
  return <Component
    {...props}
    actions={actions}
    duration={duration}
    elapsed={elapsed}
    index={index}
    status={status}
  />
})

export default withPlayer

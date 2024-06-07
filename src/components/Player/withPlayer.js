import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import { Howl } from 'howler'

import { filename } from '../../common/path'

const padTime = (time = 0) => String(time).padStart(2, 0)

const formatTime = (seconds = 0) => {
  let hour, minute, second, remain = seconds
  if (remain > 3600) {
    hour = Math.floor(remain / 3600)
    remain = remain - hour * 3600
  }
  if (remain > 60) {
    minute = Math.floor(remain / 60)
    remain = remain - minute * 60
  }
  second = Math.floor(remain)
  return `${hour ? `${padTime(hour)}:` : ''}${padTime(minute)}:${padTime(second)}`
}

const box = (source) => {
  if (typeof source === 'string') return [{ howl: null, src: source, title: filename(source) }]
  if (Array.isArray(source)) return source.map((src) => ({ howl: null, src, title: filename(src) }))
  return []
}

const withPlayer = (Component, typedOpts = {}) => forwardRef(function Player(props, ref) {
  const { src } = props
  const playlist = useMemo(() => box(src), [src])
  const [opts, setOpts] = useState({})
  const [index, setIndex] = useState(() => props.index ?? 0, [props.index])
  const [audio, setAudio] = useState()
  const [progress, setProgress] = useState(0, [audio])
  const [status, setStatus] = useState(() => audio?.state(), [audio])
  const duration = audio?.howl?.duration()
  const elapsed = duration ? duration * progress / 100 : undefined

  function step() {
    const sound = this
    const seek = sound.seek() || 0
    const percentage = (seek / sound.duration() * 100) || 0
    setProgress(percentage.toFixed(2))
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
      sound.seek(Number(value) / 100 * sound.duration())
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
  useEffect(play, [audio])
  return <Component
    {...props}
    actions={actions}
    duration={formatTime(duration)}
    elapsed={formatTime(elapsed)}
    index={index}
    progress={progress}
    setOpts={setOpts}
    status={status}
  />
})

export default withPlayer

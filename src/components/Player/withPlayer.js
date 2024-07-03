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

const withPlayer = (Component, typedOpts = {}) => forwardRef(function Player(props, ref) {
  const {
    defaultValue, onChange = (k, v) => {}, src, value,
  } = props
  const [autoplay, setAutoplay] = useState(props.autoplay)
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
  const index = defaultValue ? uncontrolledValue : value
  const setIndex = defaultValue ? setUncontrolledValue : (i) => onChange('index', i)
  const [audio, setAudio] = useState()
  const [elapsed, setElapsed] = useState(0)
  const [status, setStatus] = useState(() => audio?.howl.state())
  const [mute, setMute] = useState(false)
  const [rate, setRate] = useState(1)
  const [volume, setVolume] = useState(1)
  const duration = audio?.howl?.state() === 'loaded' ? audio.howl.duration() : undefined

  const box = (src) => {
    return typeof src !== 'string' ? src : {
      howl: new Howl({
        preload: false,
        ...typedOpts,
        src,
        onend: () => setStatus('ended'),
        onpause: () => setStatus('paused'),
        onplay: () => setStatus('playing'),
        onseek: () => requestAnimationFrame(step),
      }),
      src,
      title: filename(src),
    }
  }
  const playlist = useMemo(() => {
    if (typeof src === 'string') return [box(src)]
    if (Array.isArray(src)) return src.map(box)
    return []
  }, [src])

  const step = useCallback(() => {
    const sound = audio?.howl
    if (!sound) {
      setElapsed(0)
      return
    }
    setElapsed(Math.trunc(sound.seek() * 10) / 10)
    if (sound.playing()) requestAnimationFrame(step)
  }, [audio])

  const preprocess = (func, { play = false } = {}) => (...args) => {
    const e = args[0]
    if (typeof e === 'object' && typeof e.stopPropagation === 'function') {
      e.stopPropagation()
      setAutoplay(play)
    }
    if (!audio) return
    func(audio.howl, ...args)
  }
  const pause = preprocess((sound) => sound.pause())
  const play = preprocess((sound) => {
    if (sound.state() === 'unloaded') {
      sound.once('load', sound.play)
      sound.load()
      setStatus(sound.state())
    } else if (!sound.playing()) {
      sound.play()
    }
  }, { play: true })
  const stop = preprocess((sound) => {
    sound.stop()
    setStatus('stopped')
  })
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
    setMute,
    setRate,
    setVolume: (v) => setVolume(v / 100),
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
    if (autoplay) play()
  }, [audio])
  useEffect(() => {
    if (!audio) return
    const { howl } = audio
    howl.mute(mute)
    howl.rate(rate)
    howl.volume(volume)
  }, [audio, mute, rate, volume])

  return <Component
    {...props}
    actions={actions}
    duration={duration}
    elapsed={elapsed}
    index={index}
    mute={mute}
    rate={rate}
    status={status}
    volume={Math.trunc(volume * 100)}
  />
})

export default withPlayer

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
    initial, onChange = () => {}, src,
  } = props

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

  const [autoplay, setAutoplay] = useState(props.autoplay)
  const [innerIndex, setInnerIndex] = useState(initial)
  const index = initial !== undefined ? innerIndex : (props.index ?? 0)
  const setIndex = initial !== undefined ? setInnerIndex : (i) => onChange('index', i)
  const [audio, setAudio] = useState(playlist[index])
  const [elapsed, setElapsed] = useState(0)
  const [status, setStatus] = useState(() => audio?.howl?.state())
  const [mute, setMute] = useState(false)
  const [rate, setRate] = useState(1)
  const [volume, setVolume] = useState(1)
  const duration = audio?.howl?.state() === 'loaded' ? audio.howl.duration() : undefined

  const step = useCallback(() => {
    const sound = audio?.howl
    if (!sound) {
      setElapsed(0)
      return
    }
    setElapsed(Math.trunc(sound.seek() * 10) / 10)
    if (sound.playing()) requestAnimationFrame(step)
  }, [audio])

  const pause = () => audio.howl.pause()
  const play = (indexOrNow = true) => {
    if (indexOrNow === false) return
    if (typeof indexOrNow === 'number' && indexOrNow !== index) {
      setIndex(indexOrNow)
      return
    }
    const { howl } = audio
    if (howl.state() === 'unloaded') {
      howl.once('load', play)
      howl.load()
      setStatus(howl.state())
    } else if (!howl.playing()) {
      howl.play()
    }
  }
  const stop = () => {
    audio.howl.off('load', play)
    audio.howl.stop()
    setStatus('stopped')
  }
  const seek = (value) => audio.howl.seek(value)
  const withAutoplay = (func, play) => (...args) => {
    setAutoplay(play)
    func(...args)
  }
  const actions = {
    pause: withAutoplay(pause, false),
    play: withAutoplay(play, true),
    seek,
    setMute,
    setRate,
    setVolume: (v) => setVolume(v / 100),
    stop: withAutoplay(stop, false),
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

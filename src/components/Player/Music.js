import React, {
  memo,
  useEffect,
  useRef,
  useState,
} from 'react'
import clsx from 'clsx'
import {
  BiPause,
  BiPlay,
  BiSkipNext,
  BiSkipPrevious,
  BiSolidPlaylist,
} from 'react-icons/bi'
import {
  BsRepeat,
  BsRepeat1,
} from 'react-icons/bs'
import { IonSpinner, IonToast } from '@ionic/react'

import styles from './Music.module.css'
import Progress from './Progress'
import Rate from './Rate'
import Timer from './Timer'
import Volume from './Volume'
import withPlayer from './withPlayer'
import { useSession } from '../../common/hooks'

const path = /(?<dir>.*\/)?(?<name>[^/.]+)(\.(?<ext>[^.]+$))?/

const tick = (array, current, next = true) => {
  const index = current + (next ? 1 : -1)
  if (index < 0) return array.length - 1
  if (index === array.length) return 0
  return index
}

const modes = [
  ['列表循环', <BsRepeat title="列表循环" />], ['单曲循环', <BsRepeat1 title="单曲循环" />],
]

function Music(props) {
  const ref = useRef(null)
  const {
    actions, duration, elapsed, index, mute, rate, src = [], status, volume,
    onPlaylist = () => {},
  } = props
  const {
    pause, play, seek, setMute, setRate, setVolume, stop,
  } = actions
  const [mode, setMode] = useSession('music.mode', 0)
  const [timer, setTimer] = useSession('e-tcm.timer', 0)
  const [option, setOption] = useState(-1)
  const [blurId, setBlurId] = useState()
  const blur = (func) => (...args) => {
    func(...args)
    if (blurId) clearTimeout(blurId)
    setBlurId(setTimeout(() => setOption(-1), 5000))
  }
  const playing = status === 'playing'
  const [modeText, modeIcon] = modes[mode]
  const { groups: { name } } = path.exec(src[index] ?? '') ?? { groups: { name: '' } }
  const onMode = () => setMode(tick(modes, mode))
  const onPrevious = () => play(tick(src, index, false))
  const onToggle = playing ? pause : play
  const onNext = () => play(tick(src, index))
  useEffect(() => {
    if (status === 'ended') {
      if (mode === 0) onNext()
      else if (mode === 1) play()
    }
  }, [status])
  return (
    <div className={clsx('player', styles.player)} ref={ref}>
      <div className={styles.disc}>
        <img className={clsx({[styles.paused]: !playing})} alt="logo" src="/img/logo.png"/>
      </div>
      <div className={clsx('title', styles.title)}>{name}</div>
      <Progress max={duration} onChange={(value) => seek(value)} value={elapsed}/>
      <div className={clsx('actions', styles.actions)}>
        <span id="mode" className={clsx('mode')} onClick={onMode} title={modeText}>
          {modeIcon}
          <IonToast trigger="mode" duration={1000} message={modeText} position="top" />
        </span>
        <span className={clsx(styles.main)} onClick={onPrevious} title="上一首">
          <BiSkipPrevious/>
        </span>
        <span className={clsx(styles.main)} onClick={onToggle}>
          {status === 'loading' ? <IonSpinner className={styles.spinner} name="dots" />
            : (playing ? <BiPause title="暂停" /> : <BiPlay title="播放" />)}
        </span>
        <span className={clsx(styles.main)} onClick={onNext} title="下一首">
          <BiSkipNext/>
        </span>
        <span onClick={onPlaylist} title="播放列表">
          <BiSolidPlaylist/>
        </span>
      </div>
      <div className={clsx('options', styles.options)}>
        {(option === -1 || option === 0) && <Rate
            focusing={option === 0}
            onChange={blur(setRate)}
            onFocus={blur(() => setOption(0))}
            value={rate}
        />}
        {(option === -1 || option === 1) && <Volume
            focusing={option === 1}
            mute={mute}
            onFocus={blur(() => setOption(1))}
            onMute={blur(setMute)}
            onVolume={blur(setVolume)}
            value={volume}
        />}
        {(option === -1 || option === 2) && <Timer
            focusing={option === 2}
            onChange={blur(setTimer)}
            onFocus={blur(() => setOption(2))}
            onTimeout={stop}
            value={timer}
        />}
      </div>
    </div>
  )
}

export default memo(withPlayer(Music, { html5: true }))

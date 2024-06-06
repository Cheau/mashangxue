import React, {
  useEffect,
  useMemo,
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
import { Message, useToaster } from 'rsuite'

import 'rsuite/Message/styles/index.css'
import 'rsuite/useToaster/styles/index.css'

import styles from './Music.module.css'
import withPlayer from './withPlayer'

const path = /(?<dir>.*\/)?(?<name>[^/.]+)(\.(?<ext>[^.]+$))?/

const tick = (array, current, next = true) => {
  const index = current + (next ? 1 : -1)
  if (index < 0) return array.length - 1
  if (index === array.length) return 0
  return index
}

const modes = [
  ['列表循环', <BsRepeat />], ['单曲循环', <BsRepeat1 />],
]

function Music(props) {
  const toaster = useToaster()
  const ref = useRef(null)
  const {
    actions, duration, elapsed, index, progress, src = [], status,
    onChange = () => {}, onPlaylist = () => {},
  } = props
  const {
    pause, pick, play, seek,
  } = actions
  const [mode, setMode] = useState(0)
  const on = useMemo(() => status === 'playing', [status])
  const [modeText, modeIcon] = modes[mode]
  const { groups: { name } } = path.exec(src[index] ?? '') ?? { groups: { name: '' } }
  const onMode = () => {
    const nextMode = tick(modes, mode)
    setMode(nextMode)
    toaster.push(<Message showIcon type="info">{modes[nextMode][0]}</Message>)
  }
  const onPrevious = () => pick(tick(src, index, false))
  const onToggle = on ? pause : play
  const onNext = () => pick(tick(src, index))
  useEffect(() => onChange('index', index), [index])
  useEffect(() => {
    onChange('status', status)
    if (status === 'ended') {
      if (mode === 0) onNext()
      else play()
    }
  }, [status])
  return (
    <div className={clsx('player', styles.player)} ref={ref}>
      <div className={styles.disc}>
        <img className={clsx({[styles.paused]: !on})} alt="logo" src="/img/logo.png"/>
      </div>
      <div className={clsx('title', styles.title)}>{name}</div>
      <input className={clsx('progress', styles.progress)} type="range"
             min={0} max={100} step={0.01}
             onChange={(e) => seek(e.target.value)} value={progress}
      />
      <div className={clsx('time', styles.time)}>
        <span>{elapsed}</span>
        <span>{duration}</span>
      </div>
      <div className={clsx('actions', styles.actions)}>
        <span className={clsx('mode')} onClick={onMode} title={modeText}>
          {modeIcon}
        </span>
        <span className={clsx(styles.main)} onClick={onPrevious} title="上一首">
          <BiSkipPrevious/>
        </span>
        <span className={clsx(styles.main)} onClick={onToggle} title={on ? '暂停' : '播放'}>
          {on ? <BiPause/> : <BiPlay/>}
        </span>
        <span className={clsx(styles.main)} onClick={onNext} title="下一首">
          <BiSkipNext/>
        </span>
        <span onClick={onPlaylist} title="播放列表">
          <BiSolidPlaylist/>
        </span>
      </div>
    </div>
  )
}

export default withPlayer(Music, {html5: true})

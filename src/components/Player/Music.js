import React, {
  memo,
  useEffect,
  useRef,
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
    actions, duration, elapsed, index, src = [], status, onPlaylist = () => {},
  } = props
  const {
    pause, pick, play, seek,
  } = actions
  const [mode, setMode] = useSession('music.mode', 0)
  const playing = status === 'playing'
  const [modeText, modeIcon] = modes[mode]
  const { groups: { name } } = path.exec(src[index] ?? '') ?? { groups: { name: '' } }
  const onMode = () => setMode(tick(modes, mode))
  const onPrevious = (e) => pick(e, tick(src, index, false))
  const onToggle = playing ? pause : play
  const onNext = (e) => pick(e, tick(src, index))
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
    </div>
  )
}

export default memo(withPlayer(Music, {html5: false}))

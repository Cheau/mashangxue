import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import BrowserOnly from '@docusaurus/BrowserOnly'
import { GiAlarmClock } from 'react-icons/gi'

import styles from './index.module.css'
import data from './data'
import Player from '../Player'
import { useRender, useSession } from '../../common/hooks'
import { formatRange, padTime } from './utils'

const now = () => {
  const date = new Date()
  return `${padTime(date.getHours())}:${padTime(date.getMinutes())}`
}

const within = (time, [start, end]) => {
  if (start <= end) return start <= time && time < end
  return (start <= time && time <= '23:59') || (0 <= time && time < end)
}

const locate = (playlists) => {
  const time = now()
  for (let i = 0; i < playlists.length; i++) {
    const { ranges } = playlists[i]
    for (let j = 0; j < ranges.length; j++) {
      if (!Array.isArray(ranges[j]) || within(time, ranges[j])) return [i, j]
    }
  }
  return [-1, -1]
}

const complement = (files = []) => files.map(file => `/audio/e-tcm/${file}`)

export default function ETcm() {
  const player = useRef(null)
  const [fi, setFi] = useState(0)
  const [open, setOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [order, setOrder] = useSession('e-tcm.order', data.order)
  const [ranges, setRanges] = useSession('e-tcm.ranges', data.ranges)
  const playlists = useMemo(() => order.map((key) => ({
    ...data.profiles[key],
    ranges: ranges[key],
    onRanges: (value) => setRanges({ ...ranges, [key]: value })
  })), [order, ranges])
  const [pi, ri] = locate(playlists)
  const playlist = useMemo(() => playlists[pi], [playlists, pi])
  const range = useMemo(() => playlist.ranges[ri], [playlist, ri])
  const { effect, files, icon } = playlist
  const src = useMemo(() => complement(files), [files])
  const onChange = (key, value) => {
    switch (key) {
      case 'index': setFi(value); break
      case 'status': setPlaying(value === 'playing'); break
      default: break
    }
  }
  const onReset = () => {
    setOrder(data.order)
    setRanges(data.ranges)
  }
  const render = useRender()
  useEffect(() => {
    let timeoutId
    const refresh = () => {
      const [nextPi, nextRi] = locate(playlists)
      if (nextPi !== pi && nextRi !== ri) render()
      timeoutId = setTimeout(refresh, 1000)
    }
    refresh()
    return () => clearTimeout(timeoutId)
  }, [playlists, pi, ri])
  return (
    <>
      <div className={styles.etcm}>
        <div className={styles.desc}>
          <span className={styles.iconic}>
            {icon}{effect}
          </span>
          <span className={styles.iconic}>
            <GiAlarmClock/>{formatRange(range)}
          </span>
        </div>
        <div className={styles.title}>E-TCM Player</div>
        <div className={styles.subtitle}>听电子中药，享赛博朋克</div>
        <Player
          appearance="music"
          onChange={onChange}
          onPlaylist={() => setOpen(true)}
          ref={player}
          src={src}
        />
      </div>
      <BrowserOnly fallback={<div>Loading...</div>}>
        {() => {
          const Playlists = require('@site/src/components/E-tcm/Playlists').default
          return (
              <Playlists
                  current={{ fi, pi, ri, playing, }}
                  data={playlists.filter((list) => list.files.length)}
                  onClose={() => setOpen(false)}
                  onPick={player.current?.pick}
                  onReset={onReset}
                  open={open}
              />
          )
        }}
      </BrowserOnly>
    </>
  )
}

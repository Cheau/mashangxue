import React, { useMemo } from 'react'
import clsx from 'clsx'
import { FcMusic } from 'react-icons/fc'
import {
  Panel,
  TagGroup,
} from 'rsuite'

import 'rsuite/Panel/styles/index.css'
import 'rsuite/TagGroup/styles/index.css'

import styles from './Playlists.module.css'
import Modal from '../Modal'
import Range from './Range'
import RangeAdder from './RangeAdder'
import { filename } from '../../common/path'

function Playlist({
  current: {
    fi, pi, ri, playing,
  },
  id,
  list,
  onPick,
}) {
  const files = useMemo(() => list.files.map(filename), [list.files])
  const {
    effect, icon, max, min, onRanges, part, ranges,
  } = list
  const active = id === pi
  const scoped = max || min
  const onAdd = (range) => onRanges([...ranges, range].sort())
  const onDelete = (i) => onRanges([...ranges.slice(0, i), ...ranges.slice(i + 1)])
  const onUpdate = (i) => (range) => onRanges([...ranges.slice(0, i), range, ...ranges.slice(i + 1)])
  return (
      <Panel
        className={clsx(styles.playlist, { [styles.active]: active })}
        header={<>{icon}{effect}</>}
        shaded
      >
        <ul className={styles.items}>
          {files.map((file, i) => {
            const isItemActive = active && i === fi
            const classes = { [styles.active]: isItemActive, [styles.playing]: isItemActive && playing }
            return (
              <li key={i} className={clsx(styles.item, classes)} onClick={() => active && onPick(i)}>
                {isItemActive && <FcMusic />}{file}
              </li>
          )})}
        </ul>
        <TagGroup className={styles.ranges}>
          {ranges.map((range, i) => (
            <Range
              key={i}
              active={active && i === ri }
              deletable={!scoped}
              max={max}
              min={min}
              onChange={onUpdate(i)}
              onDelete={() => onDelete(i)}
              value={range}
            >{range}</Range>
          ))}
          {!scoped && <RangeAdder max={max} min={min} onChange={onAdd}>添加{part}时段</RangeAdder>}
        </TagGroup>
      </Panel>
  )
}

export default function Playlists({
  current,
  data = [],
  onClose = () => {},
  onPick = () => {},
  open,
}) {
  if (!open) return null
  return (
      <Modal open={open} onClose={onClose}>
        <div className={styles.playlists}>
          <h2>播放列表</h2>
          <div>
            {data.map((list, i) => (
              <Playlist key={i} current={current} id={i} list={list} onPick={onPick} />
            ))}
          </div>
        </div>
      </Modal>
  )
}

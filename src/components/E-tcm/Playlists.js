import React, { useMemo } from 'react'
import clsx from 'clsx'
import { FcMusic } from 'react-icons/fc'
import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonTitle,
  IonToolbar,
} from '@ionic/react'

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
    effect, icon, intro, max, min, onRanges, part, ranges,
  } = list
  const active = id === pi
  const scoped = max || min
  const onAdd = (range) => onRanges([...ranges, range].sort())
  const onDelete = (i) => onRanges([...ranges.slice(0, i), ...ranges.slice(i + 1)])
  const onUpdate = (i) => (range) => onRanges([...ranges.slice(0, i), range, ...ranges.slice(i + 1)])
  return (<>
      <IonList className={styles.playlist} inset mode="ios">
        <IonListHeader className={styles.header} color={active ? 'dark' : 'medium'}>
          {icon}{effect}
        </IonListHeader>
        {files.map((file, i) => {
          const isItemActive = active && i === fi
          const color = isItemActive ? 'light' : undefined
          const classes = clsx(styles.note, { [styles.playing]: isItemActive && playing })
          return (
            <IonItem key={i} button color={color} detail={false} onClick={() => active && onPick(i)}>
              {isItemActive && <FcMusic className={classes} slot="start" />}
              <IonLabel>{file}</IonLabel>
            </IonItem>
        )})}
        <div className={clsx(styles.ranges, { [styles.scopeless]: !scoped })}>
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
          {!scoped && (
            <IonItem detail={false} lines="none">
              <RangeAdder max={max} min={min} onChange={onAdd}>添加{part}时段</RangeAdder>
            </IonItem>
          )}
        </div>
      </IonList>
      <IonNote className={styles.intro}>{intro}</IonNote>
  </>)
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
          <IonContent color="light">
            <IonToolbar>
              <IonTitle>播放列表</IonTitle>
            </IonToolbar>
            {data.map((list, i) => (
              <Playlist key={i} current={current} id={i} list={list} onPick={onPick} />
            ))}
          </IonContent>
        </div>
      </Modal>
  )
}

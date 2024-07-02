import React from 'react'
import clsx from 'clsx'
import { useHookstate } from '@hookstate/core'
import { FcMusic } from 'react-icons/fc'
import {
  IonBadge,
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  useIonAlert,
  useIonToast,
} from '@ionic/react'

import styles from './Playlists.module.css'
import {
  actions, icons, playlists, stored, theory } from './data'
import Drawer from '../Drawer'
import Range from './Range'
import RangeAdder from './RangeAdder'

function Playlist({
  id,
  onPick,
  playing,
}) {
  const store = useHookstate(stored)
  const {
    file, list, ranges: allRanges, rangeIndex,
  } = store.get({ noproxy: true })
  const playlist = playlists[id]
  const icon = icons[id]
  const ranges = allRanges[id]
  const {
    effect, element, intro, max, min, note, part,
  } = theory[id]
  const active = list === id
  const onRanges = (newRanges) => store.merge({ ranges: { ...allRanges, [id]: newRanges } })
  const onAdd = (range) => onRanges([...ranges, range].sort())
  const onDelete = (i) => onRanges([...ranges.slice(0, i), ...ranges.slice(i + 1)])
  const onUpdate = (i) => (range) => onRanges([...ranges.slice(0, i), range, ...ranges.slice(i + 1)])
  return (<>
      <IonList className={styles.playlist} mode="ios">
        <IonListHeader color="dark">
          <div className={styles.header}>
            <span>{icon}{effect}</span>
            <span>
              <IonBadge color="light">{element}</IonBadge>
              <IonBadge color="light">{note}</IonBadge>
            </span>
          </div>
        </IonListHeader>
        {playlist.map((item, i) => {
          const isItemActive = (active || list === 'all') && item === file
          const color = isItemActive ? 'light' : undefined
          const classes = clsx(styles.note, { [styles.playing]: isItemActive && playing })
          return (
            <IonItem key={i} button color={color} detail={false} lines="inset" onClick={() => onPick(id, item)}>
              {isItemActive && <FcMusic className={classes} slot="start" />}
              <IonLabel>{item}</IonLabel>
            </IonItem>
        )})}
        <IonItem lines="none">
          <div className={clsx(styles.ranges)}>
            {ranges.map((range, i) => (
              <Range
                key={i}
                active={active && i === rangeIndex}
                deletable
                max={max}
                min={min}
                onChange={onUpdate(i)}
                onDelete={() => onDelete(i)}
                value={range}
              >{range}</Range>
            ))}
          </div>
        </IonItem>
        <RangeAdder max={max} min={min} onChange={onAdd}>添加{part}时段</RangeAdder>
      </IonList>
      <IonNote className={styles.intro}>{intro}</IonNote>
  </>)
}

export default function Playlists({
  onClose = () => {},
  onPick = () => {},
  open,
  playing,
}) {
  const { restore } = actions
  const [alert] = useIonAlert()
  const [toast] = useIonToast()
  const store = useHookstate(stored)
  const { order } = store.get()
  const reset = () => {
    restore()
    toast({
      color: 'success',
      duration: 1500,
      message: '默认设置已恢复',
      position: 'top',
    })
  }
  const confirmReset = () => alert({
    header: '恢复默认设置',
    message: '播放列表所有改动将被还原，是否恢复',
    buttons: [
      { text: '取消', role: 'cancel' },
      { text: '确定', role: 'confirm', handler: reset },
    ],
  })
  return (
      <Drawer maxWidth="400px" open={open} onClose={onClose} title="播放列表">
        <div className={styles.playlists}>
          <IonContent color="light">
            {order.map((id) => (
              <Playlist key={id} id={id} onPick={onPick} playing={playing} />
            ))}
            <IonButton className={styles.reset} color="dark" expand="block" onClick={confirmReset}>
              恢复默认设置
            </IonButton>
          </IonContent>
        </div>
      </Drawer>
  )
}

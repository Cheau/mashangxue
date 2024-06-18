import React, { useMemo } from 'react'
import clsx from 'clsx'
import { FcMusic } from 'react-icons/fc'
import {
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
import Drawer from '../Drawer'
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
            <IonItem key={i} button color={color} detail={false} lines="inset" onClick={() => active && onPick(i)}>
              {isItemActive && <FcMusic className={classes} slot="start" />}
              <IonLabel>{file}</IonLabel>
            </IonItem>
        )})}
        <IonItem>
          <div className={clsx(styles.ranges)}>
            {ranges.map((range, i) => (
              <Range
                key={i}
                active={active && i === ri }
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
  current,
  data = [],
  onClose = () => {},
  onPick = () => {},
  onReset = () => {},
  open,
}) {
  const [alert] = useIonAlert()
  const [toast] = useIonToast()
  const reset = () => {
    onReset()
    toast({ message: '已恢复', duration: 1500, position: 'top' })
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
            {data.map((list, i) => (
              <Playlist key={i} current={current} id={i} list={list} onPick={onPick} />
            ))}
            <IonButton color="dark" expand="block" onClick={confirmReset}>
              恢复默认设置
            </IonButton>
          </IonContent>
        </div>
      </Drawer>
  )
}

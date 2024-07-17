import React from 'react'
import { useHookstate } from '@hookstate/core'
import { FcDislike } from 'react-icons/fc'
import { useIonAlert } from '@ionic/react'

import { filename } from '../../common/path'
import data from './data'
import { noproxy } from './data/stored'

export default function Actions() {
  const [alert] = useIonAlert()
  const { actions: { set }, stored } = data
  const store = useHookstate(stored)
  const { file, list } = store.get(noproxy)
  const disable = () => {
    alert({
      header: '不再播放',
      subHeader: filename(file),
      message: '禁播后可打开播放列表的设置来恢复',
      buttons: [
        { text: '取消', role: 'cancel' },
        { text: '确认', role: 'confirm', handler: set(list, file, 'disabled', true) },
      ]
    })
  }
  return (
    <>
      <FcDislike onClick={disable} title="不再播放" />
    </>
  )
}
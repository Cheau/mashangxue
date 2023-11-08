import React from 'react'
import useIsBrowser from '@docusaurus/useIsBrowser'

import Frame from '.'

export default function Bilibili({
  aid,
  bvid,
  p,
}) {
  const isBrowser = useIsBrowser()
  const path = isBrowser ? window.location.pathname : ''
  const { groups = {} } = /(?<index>[1-9]\d*)$/.exec(path) || {}
  const ribbon = `Day ${groups.index}`
  const src = `//player.bilibili.com/player.html?aid=${aid}&bvid=${bvid}&p=${p ?? groups.index}`
  return <Frame ribbon={ribbon} src={src} />
}

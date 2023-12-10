import React from 'react'

import Frame from '.'

export default function Bilibili({
  aid,
  bvid,
  p,
}) {
  const path = typeof window === 'undefined' ? '' : window.location.pathname
  const { groups = {} } = /(?<index>[1-9]\d*)$/.exec(path) || {}
  const ribbon = groups.index ? `Day ${groups.index}` : undefined
  const src = `//player.bilibili.com/player.html?aid=${aid}&bvid=${bvid}&p=${p ?? groups.index}`
  return <Frame ribbon={ribbon} src={src} />
}

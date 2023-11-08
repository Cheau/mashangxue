import React from 'react'

import Frame from '.'

export default function Bilibili({
  aid,
  bvid,
  p,
}) {
  const { groups } = /(?<index>[1-9]\d*)$/.exec(window.location.pathname)
  const ribbon = `Day ${groups.index}`
  const src = `//player.bilibili.com/player.html?aid=${aid}&bvid=${bvid}&p=${p ?? groups.index}`
  return <Frame ribbon={ribbon} src={src} />
}

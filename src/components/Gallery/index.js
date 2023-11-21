import React from 'react'
import clsx from 'clsx';

import styles from './index.module.css'
import * as channels from './channels'
import Placard from './Placard'

function make(channel) {
  const { data, ...ctx} = channel
  const { icon, title } = ctx
  let date = new Date()
  const cards = []
  for (let i = data.length - 1; i >= 0; i--) {
    const datum = data[i]
    if (datum.date) date = new Date(datum.date)
    const order = cards.length + 1
    const link = ctx.link(order)
    cards.unshift((
      <div key={i} className={clsx('col', 'col--4')}>
        <Placard
          {...datum}
          ctx={ctx}
          date={date.toLocaleDateString('zh-CN')}
          link={link}
          order={order}
          rounded
          shadowed
          tool
        />
      </div>
    ))
    date.setDate(date.getDate() + 1)
  }
  return (
    <div key={title}>
      <div className={styles.title}>{icon} {title}</div>
      <div className="row">{cards}</div>
    </div>
  )
}

export default function Gallery() {
  const children = Object.values(channels).reverse().map((channel) => make(channel))
  return (
      <div className={styles.gallery}>
        <div className="container">
          {children}
        </div>
      </div>
  )
}

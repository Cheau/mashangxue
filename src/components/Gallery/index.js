import React, { useMemo } from 'react'
import clsx from 'clsx'

import styles from './index.module.css'
import config from './config'
import Placard from './Placard'

function assemble(data) {
  return Object.entries(data).map(([dir, value]) => ({
    ...config[dir],
    data: value.map(({
      id, image, link, ...rest
    }) => ({
      image: image ?? `/img/${dir}/${id}.svg`,
      link: link ?? `/docs/${dir}/${id}`,
      order: id === undefined ? undefined : Number(id),
      ...rest,
    })),
  }))
}

function make(group) {
  const { data, tool, ...ctx} = group
  const { icon, title } = ctx
  const cards = data.map((datum, i) => (
    <div key={i} className={clsx('col', 'col--4')}>
      <Placard
        {...datum}
        ctx={ctx}
        rounded
        shadowed
        tool={tool}
      />
    </div>))
  return (
    <div key={title}>
      <div className={styles.title}>{icon} {title}</div>
      <div className="row">{cards}</div>
    </div>
  )
}

export default function Gallery({ data }) {
  const completed = useMemo(() => assemble(data), [data])
  const children = Object.values(completed).map((group) => make(group))
  return (
      <div className={styles.gallery}>
        <div className="container">
          {children}
        </div>
      </div>
  )
}

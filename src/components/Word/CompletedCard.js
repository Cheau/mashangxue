import React, { useContext } from 'react'

import styles from './styles.module.css'
import { DataContext } from './withProviders'

function Number({ children }) {
  return <span className={styles.number}>{children}</span>
}

function Meaning({ data, order }) {
  const { definition, matched } = data
  const className = matched ? styles.matched : undefined
  const title = matched ? '当前释义' : undefined
  return (
      <div className={className} title={title}>
        <Number>{order + 1}</Number>{definition}
      </div>
  )
}

export default function CompletedCard() {
  const { data } = useContext(DataContext)
  const groups = Object.entries(data.meanings).map(([abbr, meanings]) => (
      <div key={abbr} className={styles.group}>
        <div className={styles.pos}>{abbr}</div>
        {meanings.map((m, i) => <Meaning key={`${abbr}-${i}`} data={m} order={i} />)}
      </div>
  ))
  return (
      <div id="groups" className={styles.groups}>
        {groups}
      </div>
  )
}

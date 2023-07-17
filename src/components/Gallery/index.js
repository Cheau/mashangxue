import React from 'react'
import clsx from 'clsx';

import data from './data'
import Placard from './Placard'

export default function Gallery() {
  const placards = data.map((datum, i) => (
      <div key={i} className={clsx('col', 'col--4')}>
        <Placard {...datum} />
      </div>
  ))
  return (
      <div className="container">
        <div className="row">{placards}</div>
      </div>
  )
}

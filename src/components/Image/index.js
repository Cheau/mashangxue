import React, { useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'

import styles from './styles.module.css'

const cache = {}

export default function Image({
    alt,
    children,
    ratio = 1,
    rounded = false,
    shadowed = false,
    src,
    style,
    ...rest
}) {
  const imageStyle = { ...style, paddingTop: `${ratio * 100}%` }

  const [attr, setAttr] = useState()
  const [dir, name] = useMemo(() => src.split('/'), [src])
  useEffect(async () => {
    if (!cache[dir]) {
      const res = await fetch(`/img/${dir}/attrs.json`)
      if (res.ok) cache[dir] = await res.json()
    }
    const attrs = cache[dir]
    if (attrs[name]) setAttr(attrs[name])
  }, [src])
  return (
      <div className={clsx(styles.image, 'image', { children })} style={imageStyle}>
        <div className={clsx('full', { linked: rest.onClick, rounded, shadowed })} {...rest}>
          <img alt={alt ?? name.split('.')[0]} src={`/img/${src}`} />
          {children}
          <div className="attr" dangerouslySetInnerHTML={{ __html: attr }} />
        </div>
      </div>
  )
}

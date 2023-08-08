import React, { useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
import LazyLoad from 'react-lazyload'

import styles from './styles.module.css'
import prefetch from '../../common/prefetch'

const cache = {}

export default function Image({
    alt,
    background,
    children,
    loading = "lazy",
    left = 0,
    ratio = 1,
    ribbon,
    rounded = false,
    shadowed = false,
    src,
    style,
    top = 0,
    ...rest
}) {
  const imageStyle = { ...style, background, paddingTop: `${ratio * 100}%` }

  const [attr, setAttr] = useState()
  const [dir, name, ext = 'svg'] = useMemo(() => src.split(/[\/.]/), [src])
  useEffect(async () => {
    const attrs = await prefetch(`/img/${dir}/${ext}.json`)
    if (attrs[name]) setAttr(attrs[name])
  }, [src])
  const imgStyle = useMemo(() => {
    const o = {}
    if (left) o.left = left
    if (top) o.top = top
    return o
  }, [left, top])
  return (
      <div className={clsx(styles.image, 'image', { children, rounded })} style={imageStyle}>
        <div className={clsx('full', { linked: rest.onClick, rounded, shadowed })} {...rest}>
          <LazyLoad once offset={100}>
            <img
                alt={alt ?? name.split('.')[0]}
                src={`/img/${dir}/${name}.${ext}`}
                style={imgStyle}
            />
          </LazyLoad>
          {children}
          <div className="attr" dangerouslySetInnerHTML={{ __html: attr }} />
          {ribbon && <div className="ribbon">{ribbon}</div>}
        </div>
      </div>
  )
}

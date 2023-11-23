import React, { useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
import LazyLoad from 'react-lazyload'

import styles from './styles.module.css'
import prefetch from '../../common/prefetch'
import Box from '../Box'
import Ribbon from '../Ribbon'

const path = /(?<dir>.*\/)?(?<name>[^/.]+)(\.(?<ext>[^.]+$))?/

export default function Image({
    alt,
    background,
    children,
    loading = "lazy",
    left = 0,
    ratio,
    ribbon,
    rounded = false,
    shadowed = false,
    src,
    style,
    top = 0,
    ...rest
}) {
  const [attr, setAttr] = useState()
  const {dir, name, ext = 'svg'} = useMemo(() => {
    const { groups } = path.exec(src)
    return groups
  }, [src])
  useEffect(() => {
    async function load() {
      const attrs = await prefetch(`/img/${dir}${ext}.json`)
      if (attrs[name]) setAttr(attrs[name])
    }
    load()
  }, [src])
  const imgStyle = useMemo(() => {
    const o = {}
    if (left) o.left = left
    if (top) o.top = top
    return o
  }, [left, top])
  return (
      <Box
        className={clsx('image', styles.image, { children, [styles.linked]: !!rest.onClick, [styles.rounded]: rounded, [styles.shadowed]: shadowed })}
        ratio={ratio}
        style={{ background, height: ratio ? undefined : '100%', ...style }}
        {...rest}
      >
        <LazyLoad once offset={100} height="100%">
          <img
            alt={alt ?? name.split('.')[0]}
            src={`/img/${dir}${name}.${ext}`}
            style={imgStyle}
          />
        </LazyLoad>
        {children}
        <div className="attr" dangerouslySetInnerHTML={{ __html: attr }} />
        <Ribbon.Corner>{ribbon}</Ribbon.Corner>
      </Box>
  )
}

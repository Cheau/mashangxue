import React from 'react'
import clsx from 'clsx'
import { BsX } from 'react-icons/bs'

import styles from './styles.module.css'
import Backdrop from '../Backdrop'
import { halt } from '../../common/event'

export const POSITION = {
  TOP: 'top',
  LEFT: 'left',
  RIGHT: 'right',
  BOTTOM: 'bottom',
}

const isLandscape = () => typeof window === 'undefined' || window.innerWidth > 768

const defaults = {
  position: () => isLandscape() ? POSITION.RIGHT : POSITION.BOTTOM,
  size: () => isLandscape() ? '50%' : '90%'
}

export default function Drawer(props) {
  const {
    children, maxWidth, maxHeight, onClose, open, position = defaults.position(), size = defaults.size(), title,
  } = props
  const isVertical = position === POSITION.TOP || position === POSITION.BOTTOM
  const hw = isVertical ? 'height' : 'width'
  const style = {
    [hw]: size,
    [position]: 0,
    [`max${isVertical ? 'Height' : 'Width'}`]: [isVertical ? maxHeight : maxWidth],
  }
  return (
      <Backdrop open={open} onClose={onClose}>
        <div className={clsx('drawer', styles.drawer, styles[position])} style={style} onClick={halt()}>
          <div className={clsx('header', styles.header)}>
            {title && <div className={clsx('title', styles.title)}>{title}</div>}
            <BsX className={clsx('close', styles.close)} onClick={onClose} />
          </div>
          <div className={clsx('body', styles.body)}>
            {children}
          </div>
        </div>
      </Backdrop>
  )
}

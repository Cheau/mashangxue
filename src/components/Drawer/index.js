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
  size: () => '90%'
}

const locate = (open, position) => {
  switch (position) {
    case POSITION.TOP:
    case POSITION.LEFT:
      return open ? 0 : '-100%'
    default:
      const edge = `100v${position === POSITION.RIGHT ? 'w' : 'h'}`
      return open ? `calc(${edge} - 100%)` : edge
  }
}

export default function Drawer(props) {
  const {
    children, maxWidth, maxHeight, onClose, open, position = defaults.position(), size = defaults.size(), title,
  } = props
  const drawerClasses = clsx('drawer', styles.drawer, styles[position])
  const onY = position === POSITION.TOP || position === POSITION.BOTTOM
  const hw = onY ? 'height' : 'width'
  const style = {
    [hw]: size,
    [`max${onY ? 'Height' : 'Width'}`]: [onY ? maxHeight : maxWidth],
    transform: `translate${onY ? 'Y' : 'X'}(${locate(open, position)})`,
    animationName: styles[`${position}${open ? 'In' : 'Out'}`],
  }
  return (
      <Backdrop open={open} onClose={onClose}>
        <div className={drawerClasses} style={style} onClick={halt()}>
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

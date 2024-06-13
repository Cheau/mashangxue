import React from 'react'
import clsx from 'clsx'
import { BiTime } from 'react-icons/bi'
import { Tag } from 'rsuite'

import 'rsuite/Tag/styles/index.css'

import styles from './Range.module.css'
import withRangePicker from './withRangePicker'
import { formatRange } from './utils'

export default withRangePicker(function Range({
  active = false,
  children,
  deletable = false,
  onDelete = () => {},
  ...rest
}) {
  return (
    <Tag
        className={clsx(styles.tag, { [styles.active]: active })}
        closable={deletable}
        onClose={onDelete}
        size="lg"
    >
        <span {...rest}><BiTime />{formatRange(children)}</span>
    </Tag>
  )
})

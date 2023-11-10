import React from 'react'
import clsx from 'clsx'
import { FcApproval } from 'react-icons/fc'

import styles from './styles.module.css'
import poster from './Poster.module.css'
import Box from '../Box'
import Image from '../Image'
import Ribbon from '../Ribbon'

const width = 1280
const height = 720

export default function Poster(props) {
  const {
    bg, ctx, date, desc, link, order, rate, title,
  } = props
  const imageSrc = /(?<=\/docs).+/.exec(link)[0]
  const keywords = desc.split(', ').map((words, i) => <div key={i}><FcApproval />{words}</div>)
  return (
      <div className={poster.poster}>
        <Box pic>
          <Ribbon.Mail background={bg ?? 'white'} height={height} width={width}>
            <Image
              alt={title}
              background={bg}
              ratio={height / width}
              src={imageSrc}
            />
            <div className={clsx(poster.pill, styles.pill, styles.blur)}>{title}</div>
            <div className={clsx(styles.footer)}>
              <div className={clsx(poster.panel, styles.blur)}>
                {keywords}
              </div>
              <div className={clsx(poster.bar, styles.bar, styles.blur)}>
                <div className={styles.sub}>
                  <span className={styles.icon}>{ctx.icon}</span>
                  {ctx.title}
                </div>
              </div>
            </div>
            <div className={poster.stamp} style={{ transform: `rotate(${(Math.random() - 0.5) * 60}deg)` }}>
              <Ribbon.Stamp text={`Day ${order} 打卡`} date={date} rate={rate} />
            </div>
          </Ribbon.Mail>
        </Box>
      </div>
  )
}

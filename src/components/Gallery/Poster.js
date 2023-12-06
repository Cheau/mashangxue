import React from 'react'
import clsx from 'clsx'
import { FcApproval } from 'react-icons/fc'

import placard from './Placard.module.css'
import poster from './Poster.module.css'
import { usePresenting } from '../../common/state'
import Box from '../Box'
import Image from '../Image'
import Ribbon from '../Ribbon'

const width = 1280
const height = 720

export default function Poster(props) {
  const {
    bg, ctx, date, hints, image, keywords, order, rate, title,
  } = props
  const presenting = usePresenting()
  const words = (presenting.value ? (hints ?? keywords.split(', ')) : keywords.split(', '))
  return (
      <div className={poster.poster}>
        <Box print={{ pic: true }} ratio={height / width} width={width}>
          <Ribbon.Mail background={bg ?? 'white'}>
            <Image
              alt={title}
              background={bg}
              src={image}
            />
            <div className={clsx(poster.pill, placard.pill, placard.blur)}>{title}</div>
            <div className={clsx(placard.footer)}>
              <div className={clsx(poster.panel, placard.blur)}>
                {words.map((words, i) => <div key={i}><FcApproval />{words}</div>)}
              </div>
              <div className={clsx(poster.bar, placard.bar, placard.blur)}>
                <div className={placard.sub}>
                  <span className={placard.icon}>{ctx.icon}</span>
                  {ctx.title}
                </div>
              </div>
            </div>
            <div className={poster.stamp} style={{ transform: `rotate(${(Math.random() - 0.5) * 60}deg)` }}>
              <Ribbon.Stamp text={`Day ${order} 打卡`} date={presenting.value ? date : new Date()} rate={rate} />
            </div>
          </Ribbon.Mail>
        </Box>
      </div>
  )
}

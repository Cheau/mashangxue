import React, { useState } from 'react'
import clsx from 'clsx'
import { FcInspection, FcHome } from 'react-icons/fc'
import { FaStamp } from 'react-icons/fa'

import styles from './styles.module.css'
import { usePresenting } from '../../common/state'
import Image from '../Image'
import Modal from '../Modal'
import Poster from './Poster'

export default function Placard(props) {
  const {
    badge, bg, channel, desc, link, title, x, y,
  } = props
  const presenting = usePresenting()
  const [open, setOpen] = useState(false)
  const imageSrc = /(?<=\/docs).+/.exec(link)[0]
  const punch = (e) => {
    e.stopPropagation()
    setOpen(true)
  }
  return (
      <div className={styles.placard}>
        <Image rounded shadowed
               alt={title}
               background={bg}
               left={x}
               ribbon={badge}
               src={imageSrc}
               onClick={() => window.location.href = link}
               top={y}
        >
          <div className={clsx(styles.pill, styles.blur)}>{title}</div>
          <div className={clsx(styles.footer)}>
            <div className={clsx(styles.bar, styles.blur)}>
              <div className={styles.main}>
                <span className={styles.icon}><FcInspection /></span>
                {desc}
              </div>
              <div className={styles.sub}>
                <span className={styles.icon}><FcHome /></span>
                {channel}
              </div>
            </div>
          </div>
          {presenting.value && <div className={styles.toolbox}>
            <span onClick={punch} title="打卡"><FaStamp /></span>
          </div>}
        </Image>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Poster {...props} />
        </Modal>
      </div>
  )
}

import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { FcInspection } from 'react-icons/fc'
import { FaStamp, FaVideo } from 'react-icons/fa'

import styles from './styles.module.css'
import { usePresenting } from '../../common/state'
import Image from '../Image'
import Modal from '../Modal'
import Poster from './Poster'
import Rate from '../Rate'

const difficulties = ['', '较低', '适中', '较高']

const stop = (func) => (e) => {
  e.stopPropagation()
  func()
}

export default function Placard(props) {
  const {
    bg, ctx: { Player }, desc, link, order, rate = 1, title, x, y,
  } = props
  const presenting = usePresenting()
  const [previewing, setPreviewing] = useState(false)
  const [visibility, setVisibility] = useState('hidden')
  const [punching, setPunching] = useState(false)
  const imageSrc = /(?<=\/docs).+/.exec(link)[0]
  const preview = stop(() => setPreviewing(true))
  const punch = stop(() => setPunching(true))
  useEffect(() => {
    if (!previewing) setVisibility('hidden')
  }, [previewing])
  return (
      <div className={styles.placard}>
        <Image rounded shadowed
               alt={title}
               background={bg}
               left={x}
               ribbon={`Day ${order}`}
               src={imageSrc}
               onClick={() => window.location.href = link}
               top={y}
        >
          <div className={clsx(styles.pill, styles.blur)}>{title}</div>
          <div className={clsx(styles.footer)}>
            <div className={styles.rate} title={`难度：${difficulties[rate]}`}>
              <Rate max={3} value={rate} />
            </div>
            <div className={clsx(styles.bar, styles.blur)}>
              <div className={styles.main}>
                <span className={styles.icon}><FcInspection /></span>
                {desc}
              </div>
            </div>
          </div>
          {presenting.value && (
            <div className={styles.toolbox}>
              <span
                  onMouseEnter={preview}
                  onClick={stop(() => setVisibility('visible'))}
                  onDoubleClick={stop(() => setPreviewing(false))}
                  title="预览">
                <FaVideo />
              </span>
              <span onClick={punch} title="打卡"><FaStamp /></span>
            </div>
          )}
        </Image>
        {previewing && (
          <div className={styles.player} style={{ visibility }}><Player order={order} /></div>
        )}
        <Modal open={punching} onClose={() => setPunching(false)}>
          <Poster {...props} />
        </Modal>
      </div>
  )
}

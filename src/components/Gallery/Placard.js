import React, {
  memo, useEffect, useMemo, useState,
} from 'react'
import clsx from 'clsx'
import { FcInspection } from 'react-icons/fc'
import { FaStamp, FaVideo } from 'react-icons/fa'

import styles from './Placard.module.css'
import { usePresenting } from '../../common/state'
import Image from '../Image'
import Modal from '../Modal'
import Poster from './Poster'
import Rate from '../Rate'
import Slide from './Slide'

const difficulties = ['', '较低', '适中', '较高']

const stop = (func) => (e) => {
  e.stopPropagation()
  func()
}

const Slides = memo(function Slides({ children }) {
  return typeof children === 'string' ? <Slide>{children.match(/(?<=【)[^【】]+(?=】)/g)}</Slide> : null
})

export default function Placard(props) {
  const {
    bg = 'white', ctx, desc, donut, link, order,
    rate = 1, ratio = 1, rounded = false, shadowed = false, title, tool = false, x, y,
  } = props
  const presenting = usePresenting()
  const poster = useMemo(() => <Poster {...props} />, [])
  const [hovering, setHovering] = useState(false)
  const [previewing, setPreviewing] = useState(false)
  const [visible, setVisible] = useState(false)
  const [punching, setPunching] = useState(false)
  const imageSrc = /(?<=\/docs).+/.exec(link)[0]
  const toggleHover = stop(() => setHovering(!hovering))
  const preview = stop(() => setPreviewing(true))
  const togglePreview = stop(() => {
    if (!previewing) {
      setPreviewing(true)
    } else if (!visible) {
      setVisible(true)
    } else {
      setPreviewing(false)
    }
  })
  const punch = stop(() => setPunching(true))
  useEffect(() => {
    if (!previewing) setVisible(false)
  }, [previewing])
  return (
      <div className={clsx('placard', styles.placard)} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
        <Image rounded={rounded} shadowed={shadowed}
               alt={title}
               background={bg}
               left={x}
               ratio={ratio}
               ribbon={order ? `Day ${order}` : undefined}
               src={imageSrc}
               onClick={() => window.location.href = link}
               top={y}
        >
          <Slides>{presenting.value && hovering && donut}</Slides>
          <div className={clsx(styles.footer)}>
            <div className={styles.rate} title={`难度：${difficulties[rate]}`}>
              <Rate max={3} value={rate} />
            </div>
            {desc && <div className={clsx(styles.bar, styles.blur)}>
              <div className={styles.main}>
                <span className={styles.icon}><FcInspection /></span>
                {desc}
              </div>
            </div>}
          </div>
        </Image>
        <div className={clsx(styles.pill, styles.blur)}>{title}</div>
        {tool && (hovering || visible) && (
            <div className={styles.toolbox}>
              <span
                className={clsx({ active: visible })}
                onMouseEnter={preview}
                onClick={togglePreview}
                title={visible ? '关闭预览' : '预览视频'}
              >
                <FaVideo />
              </span>
              <span onClick={punch} title="学习打卡"><FaStamp /></span>
            </div>
        )}
        {ctx?.Player && previewing && (
          <div className={styles.player} style={{ visibility: visible ? 'visible' : 'hidden' }}>
            <ctx.Player order={order} />
          </div>
        )}
        <Modal open={punching} onClose={() => setPunching(false)}>
          {poster}
        </Modal>
      </div>
  )
}

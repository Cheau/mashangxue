import React, {
  memo, useMemo, useState,
} from 'react'
import clsx from 'clsx'
import { IonBadge } from '@ionic/react'
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
  return <Slide>{children}</Slide>
})

export default function Placard(props) {
  const {
    bg = 'white', ctx, description, hints, image, keywords, link, order,
    rate, ratio = 1, rounded = false, shadowed = false, title, tool = false, x, y,
  } = props
  const presenting = usePresenting()
  const poster = useMemo(() => <Poster {...props} />, [])
  const [hovering, setHovering] = useState(false)
  const [previewing, setPreviewing] = useState(false)
  const [punching, setPunching] = useState(false)
  const togglePreview = stop(() => setPreviewing(!previewing))
  const punch = stop(() => setPunching(true))
  return (
      <div
        className={clsx('placard', styles.placard)}
        onMouseOver={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <Image rounded={rounded} shadowed={shadowed}
               alt={title}
               background={bg}
               left={x}
               ratio={ratio}
               ribbon={order ? `Day ${order}` : undefined}
               src={image}
               onClick={() => window.location.href = link}
               top={y}
        >
          <Slides>{presenting.value && hovering && hints}</Slides>
          <div className={clsx(styles.footer)}>
            {rate && <div className={styles.rate} title={`难度：${difficulties[rate]}`}>
              <Rate max={3} value={rate} />
            </div>}
            <div className={styles.tags}>
              {keywords.map((keyword, i) => <IonBadge key={i} color="dark">{keyword}</IonBadge>)}
            </div>
            {description && <div className={clsx(styles.bar, styles.blur)}>
              <div className={styles.main}>
                <span>{description}</span>
              </div>
            </div>}
          </div>
        </Image>
        <div className={clsx(styles.pill, styles.blur)}>{title}</div>
        {tool && (hovering || previewing) && (
            <div className={styles.toolbox}>
              <span
                className={clsx({ active: previewing })}
                onClick={togglePreview}
                title={previewing ? '关闭预览' : '预览视频'}
              >
                <FaVideo />
              </span>
              <span onClick={punch} title="学习打卡"><FaStamp /></span>
            </div>
        )}
        {ctx?.Player && previewing && (
          <div className={styles.player} style={{ visibility: previewing ? 'visible' : 'hidden' }}>
            <ctx.Player order={order} />
          </div>
        )}
        <Modal open={punching} onClose={() => setPunching(false)}>
          {poster}
        </Modal>
      </div>
  )
}

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Keyboard, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/keyboard'
import 'swiper/css/pagination'
import styles from './Slide.module.css'

const slideNames = ['blue', 'red', 'yellow', 'green', 'black']

export default function Slide({ children }) {
  if (!children) return null
  const slides = children.map((hint, i) => <SwiperSlide key={i} className={slideNames[i]}>{hint}</SwiperSlide>)
  return (
      <div className={styles.slide}>
        <Swiper modules={[Keyboard, Pagination]} keyboard loop pagination>
          <SwiperSlide />
          {slides}
        </Swiper>
      </div>
  )
}

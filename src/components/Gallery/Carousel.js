import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import styles from './Carousel.module.css'
import Placard from './Placard'

const modules = [
  Autoplay, EffectCoverflow, Navigation, Pagination,
]

export default function Carousel({ data }) {
  return (
    <div className={styles.carousel}>
      <Swiper
        centeredSlides
        coverflowEffect={{
          rotate: 50,
          stretch: 2,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        effect="coverflow"
        loop
        modules={modules}
        navigation
        pagination={{ clickable: true }}
        slidesPerView={4}
        spaceBetween={-100}
      >
        {data.map(({ hints, ...rest }, i) => (
          <SwiperSlide key={i}>
            <Placard {...rest} ratio={3 / 4} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

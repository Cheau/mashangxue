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
import * as channels from './channels'
import Placard from './Placard'

const modules = [
  Autoplay, EffectCoverflow, Navigation, Pagination,
]

function some(data, count) {
  const actual = Math.min(data.length, count)
  const random = data.map((datum, i) => ({...datum, order: data.length - i}))
  for (let i = 0; i < actual; i++) {
    const index = i + Math.floor(Math.random() * (random.length - i))
    const tmp = random[i]
    random[i] = random[index]
    random[index] = tmp
  }
  return random.slice(0, count)
}

function Slide(props) {
  const {
    bg, link, rate, title,
  } = props
  return (
    <Placard
      bg={bg}
      link={link}
      rate={rate}
      ratio={3 / 4}
      title={title}
    />
  )
}

export default function Carousel() {
  const total = 10
  const source = Object.values(channels)
  const count = total / source.length
  const courses = source.map(({ data, link }) => {
    const random = some(data, count)
    return random.map((datum) => {
      datum.link = link(datum.order)
      return datum
    })
  }).flat()
  return (
    <div className={styles.carousel}>
      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
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
        {courses.map((course, i) => (
          <SwiperSlide key={i}>
            <Slide {...course} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

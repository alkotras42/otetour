import React, { useState, useRef } from 'react'
import cn from 'classnames'
import { Button, Calendar, Card, Location } from '../../../Component'
import styles from './Recomendation.module.css'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import arrowPrev from './arrowPrev.svg'
import arrowNext from './arrowNext.svg'
import { Pagination, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'

export const Recomendation = ({ className, ...props }) => {
	const [active, setActive] = useState(1)

	const prevRef = useRef(null)
	const nextRef = useRef(null)

	return (
		<div className={cn(className, styles.recomendation)}>
			<span className={styles.title}>Рекомендации для вас</span>
			<div className={styles.carouselWrapper}>
				<img src={arrowPrev} alt='' ref={prevRef} className={styles.arrowPrev} />
				<img src={arrowNext} alt='' ref={nextRef} className={styles.arrowNext} />
				<div className={styles.carousel}>
					<Swiper
						onInit={(swiper) => {
							swiper.params.navigation.prevEl = prevRef.current
							swiper.params.navigation.nextEl = nextRef.current
							swiper.navigation.init()
							swiper.navigation.update()
						}}
						slidesPerView={3}
						spaceBetween={20}
						loop={true}
						modules={[Navigation]}
						className={styles.swiper}
					>
						<SwiperSlide>
							<Card />
						</SwiperSlide>
						<SwiperSlide>
							<Card />
						</SwiperSlide>
						<SwiperSlide>
							<Card />
						</SwiperSlide>
						<SwiperSlide>
							<Card />
						</SwiperSlide>
						<SwiperSlide>
							<Card />
						</SwiperSlide>
						<SwiperSlide>
							<Card />
						</SwiperSlide>
						<SwiperSlide>
							<Card />
						</SwiperSlide>
						<SwiperSlide>
							<Card />
						</SwiperSlide>
					</Swiper>
				</div>
			</div>
		</div>
	)
}

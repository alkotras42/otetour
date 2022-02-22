import React, { useRef } from 'react'
import cn from 'classnames'
import styles from './Carousel.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import arrowPrev from './arrowPrev.svg'
import arrowNext from './arrowNext.svg'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'

export const Carousel = ({ className, children, ...props }) => {
	const prevRef = useRef(null)
	const nextRef = useRef(null)

	return (
		<div className={cn(className, styles.carousel)} {...props}>
			<div className={styles.carouselWrapper}>
				<img src={arrowPrev} alt='' ref={prevRef} className={styles.arrowPrev} />
				<img src={arrowNext} alt='' ref={nextRef} className={styles.arrowNext} />
				<div>
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
						{children && children.map(c => (
							<SwiperSlide>{c}</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</div>
	)
}

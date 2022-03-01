import React from 'react'
import cn from 'classnames'
import { Carousel, GuideCard } from '../../../../Component'
import styles from './Guides.module.css'

export const Guides = ({ className, ...props }) => {
	const guide_data = {
		name: 'Алексей',
		country: 'Германия',
		type: 'Вело-туры',
		img: 'guideImg1.png',
	}

	const responsive = {
		superLargeDesktop: {
			// the naming can be any, depends on you.
			breakpoint: { max: 4000, min: 3000 },
			items: 5,
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 3,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
		},
	}

	return (
		<div className={cn(className, styles.guides)} {...props}>
			<span className={styles.title}>Наши гиды</span>
			<Carousel loop={true} itemsCount={4}>
				<GuideCard card={guide_data} />
				<GuideCard card={guide_data} />
				<GuideCard card={guide_data} />
				<GuideCard card={guide_data} />
				<GuideCard card={guide_data} />
				<GuideCard card={guide_data} />
			</Carousel>
		</div>
	)
}

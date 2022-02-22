import React from 'react'
import cn from 'classnames'
import { Carousel, GuideCard } from '../../../Component'
import styles from './Guides.module.css'

export const Guides = ({ className, ...props }) => {
	const guide_data = {
		name: 'Алексей',
		country: 'Германия',
		type: 'Вело-туры',
		img: 'guideImg1.png',
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

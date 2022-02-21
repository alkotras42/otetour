import React, { useState } from 'react'

import cn from 'classnames'
import { Button, Calendar, Card, Location } from '../../../Component'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './Recomendation.module.css'

export const Recomendation = ({ className, ...props }) => {
	const [active, setActive] = useState(1)

	return (
		<div className={cn(className, styles.recomendation)}>
			<span className={styles.title}>Рекомендации для вас</span>
			<Carousel infiniteLoop='true' centerMode='true' selectedItem='3' width='1200px'>
				<Card />
				<Card />
				<Card />
			</Carousel>
		</div>
	)
}

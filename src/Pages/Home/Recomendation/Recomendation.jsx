import React from 'react'
import cn from 'classnames'
import { Card, Carousel } from '../../../Component'
import styles from './Recomendation.module.css'

export const Recomendation = ({ className, ...props }) => {

	return (
		<div className={cn(className, styles.recomendation)} {...props}>
			<span className={styles.title}>Рекомендации для вас</span>
			<Carousel>
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
			</Carousel>
		</div>
	)
}

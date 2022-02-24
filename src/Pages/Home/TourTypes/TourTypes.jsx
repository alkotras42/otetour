import React from 'react'
import cn from 'classnames'
import { CardMini } from '../../../Component'
import styles from './TourTypes.module.css'

export const TourTypes = ({ className, ...props }) => {
	const card_data = {
		country: 'Конные туры',
		img: 'images/TourImg1.png',
	}
	return (
		<div className={cn(className, styles.tourTypes)} {...props}>
			<span className={styles.title}>Выбирайте тур по своим интересам</span>
			<div className={styles.toures}>
				<CardMini card={card_data} />
				<CardMini card={card_data} />
				<CardMini card={card_data} />
				<CardMini card={card_data} />
				<CardMini card={card_data} />
				<CardMini card={card_data} />
				<CardMini card={card_data} />
				<CardMini card={card_data} lastCard={true} className={styles.LastCard} />
			</div>
		</div>
	)
}

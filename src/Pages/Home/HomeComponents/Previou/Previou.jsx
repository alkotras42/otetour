import React from 'react'
import cn from 'classnames'
import { Card, Carousel } from '../../../../Component'
import styles from './Previou.module.css'

export const Previou = ({ className, ...props }) => {
	const card_data = {
		title: 'Путешествие по винодельням и виноградникам (Армения)',
		daysCount: 5,
		type: 'Винный тур',
		date: 'Июнь 2021',
		price: 27000,
		sale: false,
		oldPrice: 27000,
		rating: 4.6,
		reviewCount: 127,
		img: 'cardImg2.png',
	}
	return (
		<div className={cn(className, styles.recomendation)} {...props}>
			<span className={styles.title}>Ранее просмотренные туры</span>
			<Carousel loop={false}>
				<Card card={card_data} />
				<Card card={card_data}/>
			</Carousel>
		</div>
	)
}

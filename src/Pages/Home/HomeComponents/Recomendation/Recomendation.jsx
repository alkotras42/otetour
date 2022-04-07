import React from 'react'
import cn from 'classnames'
import { Card, Carousel } from '../../../../Component'
import styles from './Recomendation.module.css'
import { t } from 'i18next'

export const Recomendation = ({ className, ...props }) => {
	const card_data = {
		title: 'Путешествие по озерам (Карелия, Россия)',
		daysCount: 11,
		type: 'Вело-тур',
		date: 'Июнь 2021',
		price: 20000,
		sale: true,
		oldPrice: 27000,
		rating: 4.6,
		reviewCount: 630,
		img: 'cardImg1.png',
	}
	return (
		<div className={cn(className, styles.recomendation)} {...props}>
			<span className={styles.title}>{t('Рекомендации для вас')}</span>
			<Carousel loop={true}>
				<Card card={card_data} />
				<Card card={card_data}/>
				<Card card={card_data}/>
				<Card card={card_data}/>
				<Card card={card_data}/>
			</Carousel>
		</div>
	)
}

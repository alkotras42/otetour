import React from 'react'
import cn from 'classnames'
import styles from './Card.module.css'
import heartIcon from './heart.svg'
import startIcon from './star.svg'
import { priceRu } from '../../Helpers/helpers'

export const Card = ({ className, card, ...props }) => {
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
		<div className={cn(className, styles.card)} {...props}>
			<div className={styles.cardTop}>
				<img src={`/images/${card_data.img}`} alt='' className={styles.image} />
				{card_data.sale ? <div className={styles.sale}>Скидка</div> : null}
				<img src={heartIcon} alt='' />
				<div className={styles.rating}>
					<img src={startIcon} alt='' className={styles.star} />
					<span className={styles.ratingCount}>{card_data.rating}</span>
					<span className={styles.reviewCount}>({card_data.reviewCount} отзывов)</span>
				</div>
			</div>
			<div className={styles.cardBottom}>
				<div className={styles.title}>{card_data.title}</div>
				<div className={styles.info}>
					<span>{card_data.daysCount} дней</span>
					<span>{card_data.type}</span>
					<span>{card_data.date}</span>
				</div>
				{card_data.sale ? (
					<div className={styles.prices}>
						<span className={styles.salePrice}>{priceRu(card_data.price) }</span>
						<span className={styles.oldPrice}>{priceRu(card_data.oldPrice)}</span>
					</div>
				) : (
					<div className={style.prices}>
						<span className={styles.price}>{priceRu(card_data.price)}</span>
					</div>
				)}
			</div>
		</div>
	)
}

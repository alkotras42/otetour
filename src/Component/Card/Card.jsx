import React from 'react'
import cn from 'classnames'
import styles from './Card.module.css'
import startIcon from './star.svg'
import { priceRu } from '../../Helpers/helpers'

export const Card = ({ className, card, ...props }) => {
	return (
		<div className={cn(className, styles.card)} {...props}>
			<div className={styles.cardTop}>
				<img src={`/images/${card.img}`} alt='' className={styles.image} />
				{card.sale ? <div className={styles.sale}>Скидка</div> : null}
				<div className={styles.rating}>
					<img src={startIcon} alt='' className={styles.star} />
					<span className={styles.ratingCount}>{card.rating}</span>
					<span className={styles.reviewCount}>({card.reviewCount} отзывов)</span>
				</div>
			</div>
			<div className={styles.cardBottom}>
				<div className={styles.title}>{card.title}</div>
				<div className={styles.info}>
					<span>{card.daysCount} дней</span>
					<span>{card.type}</span>
					<span>{card.date}</span>
				</div>
				{card.sale ? (
					<div className={styles.prices}>
						<span className={styles.salePrice}>{priceRu(card.price) }</span>
						<span className={styles.oldPrice}>{priceRu(card.oldPrice)}</span>
					</div>
				) : (
					<div className={styles.prices}>
						<span className={styles.price}>{priceRu(card.price)}</span>
					</div>
				)}
			</div>
		</div>
	)
}

import React from 'react'
import cn from 'classnames'
import styles from './CardFavorite.module.css'
import startIcon from './star.svg'
import headerIcon from './heart.svg'
import { priceRu } from '../../Helpers/helpers'

export const CardFavorite = ({ className, card, ...props }) => {
	return (
		<div className={cn(className, styles.card)} {...props}>
			<div className={styles.cardTop}>
				<img src={`/images/${card.img}`} alt='' className={styles.image} />
				{card.sale ? <div className={styles.sale}>Скидка</div> : null}
				<img className={styles.headerIcon} src={headerIcon} alt='' />
				<div className={styles.rating}>
					<img src={startIcon} alt='' className={styles.star} />
					<span className={styles.ratingCount}>{card.rating}</span>
					<span className={styles.reviewCount}>({card.reviewCount} отзывов)</span>
				</div>
			</div>
			<div className={styles.cardBottom}>
				<div className={styles.type}>{card.type}</div>
				<div className={styles.title}>{card.title}</div>
				<div className={styles.daysCount}>{card.daysCount} дней</div>
				<div className={styles.info}>
					<div className={styles.tours}>
						<div className={styles.tourItem}>20 мая — 9 мест</div>
						<div className={styles.tourItem}>20 июня — 16 мест</div>
					</div>
					{card.sale ? (
						<div className={cn(styles.prices, styles.priceWithSale)}>
							<span className={styles.salePrice}>{priceRu(card.price)}</span>
							<span className={styles.oldPrice}>{priceRu(card.oldPrice)}</span>
						</div>
					) : (
						<div className={styles.prices}>
							<span className={styles.price}>{priceRu(card.price)}</span>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

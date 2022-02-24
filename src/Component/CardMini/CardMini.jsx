import React from 'react'
import cn from 'classnames'
import styles from './CardMini.module.css'
import ArrowIcon from './arrow.svg'

export const CardMini = ({ className, card, lastCard = false, ...props }) => {
	return (
		<div className={cn(className, styles.card)} {...props}>
			<img src={card.img} alt='' className={styles.image} />

			<div className={styles.cardText}>
				{lastCard ? (
					<div>
						<span className={styles.title}>У нас есть еще больше тематик на любой вкус</span>
						<p className={styles.moreLink}>
							Посмотреть <img src={ArrowIcon} alt='' className={styles.moreArrow} />
						</p>
					</div>
				) : (
					<span className={styles.title}>{card.country}</span>
				)}
			</div>
		</div>
	)
}

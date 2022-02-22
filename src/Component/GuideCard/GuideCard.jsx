import React from 'react'
import cn from 'classnames'
import styles from './GuideCard.module.css'

export const GuideCard = ({ className, card, ...props }) => {
	return (
		<div className={cn(className, styles.card)} {...props}>
			<div className={styles.cardTop}>
				<img src={`/images/${card.img}`} alt='' className={styles.image} />
			</div>
			<div className={styles.cardBottom}>
				<div className={styles.title}>{card.name}</div>
				<div className={styles.info}>
					<span>{card.country}</span>
					<span>{card.type}</span>
				</div>
			</div>
		</div>
	)
}

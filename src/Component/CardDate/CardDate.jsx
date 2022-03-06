import React from 'react'
import cn from 'classnames'
import styles from './CardDate.module.css'

export const CardDate = ({ className, card, ...props }) => {
	return (
		<div className={cn(className, styles.card)} {...props}>
			<div className={styles.cardTop}>
				<img src={`/images/${card.img}`} alt='' className={styles.image} />
			</div>
			<div className={styles.cardBottom}>
				<div className={styles.title}>{card.title}</div>
				<div className={styles.cardInfo}>
					<p className={styles.cardText}>Даты</p>
					<div className={styles.dates}>
						<span>{card.dateStart}</span> — <span>{card.dateEnd}</span>
					</div>
					<p className={styles.cardText}>Занято мест</p>
					<div className={styles.plases}>
						<span>{card.plasesHold}</span> из <span>{card.plasesTotal}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

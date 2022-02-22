import React from 'react'
import cn from 'classnames'
import styles from './CountryCard.module.css'

export const CountryCard = ({ className, card, ...props }) => {
	return (
		<div className={cn(className, styles.card)} {...props}>
			<img src={card.img} alt="" className={styles.image} />
			<span className={styles.title}>{card.country}</span>
		</div>
	)
}

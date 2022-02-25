import React from 'react'
import cn from 'classnames'
import styles from './BlogCard.module.css'

export const BlogCard = ({ className, card, ...props }) => {
	return (
		<div className={cn(className, styles.card)} {...props}>
			<img src={card.img} alt='' className={styles.image} />
			<p className={styles.date}>{card.date}</p>
			<p className={styles.title}>{card.title}</p>
		</div>
	)
}

import React from 'react'
import cn from 'classnames'
import styles from './Rating.module.css'
import RatingIcon from './Rating.svg'
import { ReactSVG } from 'react-svg'

export const Rating = ({ className, rate, ...props }) => {
	const difArray = new Array(5).fill(<div></div>)

	return (
		<div className={styles.raring} {...props}>
			{difArray.map((item, i) => (
				<ReactSVG
					key={i}
					src={RatingIcon}
					className={cn(styles.rateIcon, {
						[styles.transparent]: i > rate - 1,
					})}
					alt=''
				/>
			))}
		</div>
	)
}

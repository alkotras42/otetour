import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './Rating.module.css'
import { ReactComponent as RatingIcon } from './Rating.svg'
import { ReactSVG } from 'react-svg'

export const Rating = ({ className, isEditible = false, setRating, rating, ...props }) => {
	const [ratingArray, setRatingArray] = useState(new Array(5).fill(<div></div>))

	useEffect(() => {
		constractRaiting(rating)
	}, [rating])

	const constractRaiting = (currentRating) => {
		const updatedArray = ratingArray.map((r, i) => {
			return (
				<RatingIcon
					key={i}
					src={RatingIcon}
					className={cn(styles.rateIcon, {
						[styles.transparent]: i > currentRating - 1,
						[styles.editible]: isEditible,
					})}
					onMouseOver={() => changeDisplay(i + 1)}
					onMouseLeave={() => changeDisplay(rating)}
					onClick={() => handleClick(i + 1)}
				/>
			)
		})
		setRatingArray(updatedArray)
	}

	const changeDisplay = (i) => {
		if (!isEditible) {
			return
		}
		constractRaiting(i)
	}

	const handleClick = (i) => {
		if (!isEditible || !setRating) {
			return
		}
		setRating(i)
	}

	return (
		<div className={styles.raring} {...props}>
			{ratingArray.map((r, i) => (
				<span key={i}>{r}</span>
			))}
		</div>
	)
}

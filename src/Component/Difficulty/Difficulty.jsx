import React from 'react'
import cn from 'classnames'
import styles from './Difficulty.module.css'
import DiffIcon from './DiffIcon.svg'

export const Difficulty = ({ className, difficulty, ...props }) => {
	const difArray = new Array(5).fill(<div></div>)

	return (
		<div {...props}>
			{difArray.map((item, i) => (
				<img
					key={i}
					src={DiffIcon}
					className={cn(styles.diffIcon, {
						[styles.transparent]: i > difficulty - 1,
					})}
					alt=''
				/>
			))}
		</div>
	)
}

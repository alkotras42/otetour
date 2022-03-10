import React from 'react'
import cn from 'classnames'
import styles from './Button.module.css'

export const Button = ({ className, color = 'green', children, ...props }) => {
	return (
		<button
			className={cn(className, {
				[styles.greenButton]: color == 'green',
				[styles.whiteButton]: color == 'white',
			})}
			{...props}
		>
			{children}
		</button>
	)
}

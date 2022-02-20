import React from 'react'
import cn from 'classnames'
import styles from './Button.module.css'

export const Button = ({ className, children, ...props }) => {
	return (
		<button className={cn(className, styles.button)} {...props}>
			{children}
		</button>
	)
}

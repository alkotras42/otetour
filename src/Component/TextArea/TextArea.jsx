import React, { forwardRef } from 'react'
import cn from 'classnames'
import styles from './TextArea.module.css'

export const TextArea = forwardRef(({ className, type, placeholder, value, filled, ...props }, ref) => {
	return (
		<div
			className={cn(className, styles.wrapper, {
				[styles.filled]: value || filled,
			})}
		>
			<textarea ref={ref} value={value} className={styles.input} {...props} />
			<label className={styles.label}>{placeholder}</label>
		</div>
	)
})

import React, { forwardRef } from 'react'
import cn from 'classnames'
import styles from './TextArea.module.css'

export const TextArea = forwardRef(({ className, type, placeholder, value, filled, error, ...props }, ref) => {
	return (
		<div
			className={cn(className, styles.wrapper, {
				[styles.filled]: value || filled,
			})}
		>
			<textarea
				ref={ref}
				value={value}
				className={cn(styles.input, {
					[styles.inputError]: error,
				})}
				{...props}
			/>
			<label className={styles.label}>{placeholder}</label>
			{error && <p className={styles.error}>{error.message}</p>}
		</div>
	)
})

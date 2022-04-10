import React from 'react'
import cn from 'classnames'
import styles from './TextArea.module.css'

export const TextArea = ({ className, type, placeholder, value, ...props }) => {
	return (
		<div
			className={cn(className, styles.wrapper, {
				[styles.filled]: value,
			})}
		>
			<textarea value={value} className={styles.input} {...props} />
			<label className={styles.label}>{placeholder}</label>
		</div>
	)
}

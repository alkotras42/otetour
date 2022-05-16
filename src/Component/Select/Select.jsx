import React, { forwardRef } from 'react'
import cn from 'classnames'
import styles from './Select.module.css'
import ArrowArrow from './arrow.svg'

export const Select = forwardRef(
	({ className, children, type, placeholder, options, filled, error, ...props }, ref) => {
		return (
			<div
				className={cn(className, styles.wrapper, {
					[styles.filled]: filled,
				})}
			>
				<select
					value={filled}
					ref={ref}
					className={cn(styles.input, {
						[styles.inputError]: error,
					})}
					{...props}
				>
					<option value={''} default hidden></option>
					{options &&
						Object.values(options).map((option) => (
							<option key={option.id} value={option.id}>
								{option.name}
							</option>
						))}
				</select>
				<img src={ArrowArrow} alt='' className={styles.arrowIcon} />
				<label className={styles.label}>{placeholder}</label>
				{error && <p className={styles.error}>{error.message}</p>}
			</div>
		)
	}
)

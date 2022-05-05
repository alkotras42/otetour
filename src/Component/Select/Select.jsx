import React, { forwardRef } from 'react'
import cn from 'classnames'
import styles from './Select.module.css'
import ArrowArrow from './arrow.svg'

export const Select = forwardRef(
	({ className, children, type, placeholder, options, value, filled, icon, error, ...props }, ref) => {
		return (
			<div
				className={cn(className, styles.wrapper, {
					[styles.filled]: value || filled,
				})}
			>
				{icon && <img src={icon} alt='' className={styles.icon} />}
				<select
					defaultValue=''
					ref={ref}
					value={value}
					className={cn(styles.input, {
						[styles.inputError]: error,
					})}
					{...props}
				>
					<option value='' disabled hidden></option>
					{options &&
						Object.values(options).map((option) => (
							<option key={option.id} value={option.id}>
								{option.name}
							</option>
						))}
				</select>
				<img src={ArrowArrow} alt='' className={styles.arrowIcon} />
				<label
					className={cn(styles.label, {
						[styles.labelWithIcon]: icon,
					})}
				>
					{placeholder}
				</label>
				{error && <p className={styles.error}>{error.message}</p>}
			</div>
		)
	}
)

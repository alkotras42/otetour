import React, { forwardRef, useState } from 'react'
import cn from 'classnames'
import styles from './Input.module.css'
import EyeIcon from './Eye.svg'
import CloseEyeIcon from './closeEye.svg'

export const Input = forwardRef(({ className, children, type, placeholder, value, filled, icon, ...props }, ref) => {
	const [showPassword, setShowPassword] = useState(type === 'password' ? false : true)

	const changeType = () => {
		setShowPassword(!showPassword)
	}
	return (
		<div
			className={cn(className, styles.wrapper, {
				[styles.filled]: value || filled,
			})}
		>
			{icon && <img src={icon} alt='' className={styles.icon} />}
			<input
				ref={ref}
				value={value}
				type={showPassword ? 'text' : 'password'}
				className={cn(styles.input, {
					[styles.inputWithIcon]: icon,
				})}
				{...props}
			/>
			{type == 'password' && (
				<img src={showPassword ? CloseEyeIcon : EyeIcon} alt='' className={styles.eye} onClick={changeType} />
			)}
			<label
				className={cn(styles.label, {
					[styles.labelWithIcon]: icon,
				})}
			>
				{placeholder}
			</label>
		</div>
	)
})

import React, { forwardRef } from 'react'
import cn from 'classnames'
import styles from './CustomSelectWithSearch.module.css'
import ArrowArrow from './arrow.svg'
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'
import { Input } from '../Input/Input'

export const CustomSelectWithSearch = forwardRef(
	({ className, children, type, placeholder, options, value, filled, error, ...props }, ref) => {
		const customStyles = {
			control: (styles, { isFocused, isDisabled, menuIsOpen }) => ({
				...styles,
				backgroundColor: '#fff',
				padding: '5px 15px 7px',
				outline: 'none',
				border: menuIsOpen && 'none',
				border: isFocused ? '1px solid #6e93d6' : '1px solid #ccc',
				opacity: isDisabled && '0.5',
				boxShadow: 'none',
			}),
			placeholder: (styles, { isDisabled }) => ({
				...styles,
				opacity: isDisabled && '0.5',
			}),
			dropdownIndicator: (styles, { isFocused }) => ({
				...styles,
				width: '35px',
				height: '35px',
				position: 'absolute',
				right: '0px',
				transition: '0.3s all ease',
				transform: isFocused && 'rotate(180deg)',
			}),
			indicatorSeparator: (styles) => ({ ...styles, display: 'none' }),
		}

		return (
			<div
				className={cn(className, styles.wrapper, {
					[styles.filled]: filled || value,
				})}
			>
				<Select
					defaultValue=''
					className={cn(styles.input, {
						[styles.inputError]: error,
					})}
					styles={customStyles}
					options={options}
					getOptionLabel={(option) => option.name}
					getOptionValue={(option) => option.id}
					placeholder=''
					value={options.length && options.find((option) => option.id === value)}
					isDisabled={props.disabled}
					{...props}
					ref={ref}
				/>
				<label
					className={cn(styles.label, {
						[styles.disabled]: props.disabled,
					})}
				>
					{placeholder}
				</label>
				{error && <p className={styles.error}>{error.message}</p>}
			</div>
		)
	}
)

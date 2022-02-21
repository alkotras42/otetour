import React, { useState } from 'react'
import cn from 'classnames'
import styles from './Location.module.css'
import { Input } from '../Input/Input'
import locationIcon from './locationIcon.svg'
import pointIcon from './pointIcon.svg'

export const Location = ({ className, type, ...props }) => {
	const [loc, setLoc] = useState('')

	const [showPicker, setShowPicker] = useState(false)

	const changeLocation = (e) => {
		setLoc(e.currentTarget.getAttribute('value'))
		setShowPicker(false)
	}

	return (
		<div className={cn(className, styles.location)}>
			<div>
				<img src={locationIcon} alt='' className={styles.locationIcon} />
				<Input
					className={styles.locationInput}
					placeholder='Куда'
					value={loc}
					onClick={() => setShowPicker(!showPicker)}
					readOnly
				></Input>
			</div>
			<div
				className={cn(styles.locationPicker, {
					[styles.hide]: !showPicker,
				})}
			>
				<div className={styles.locationItem} onClick={changeLocation} value='Петрозаводск'>
					<img src={pointIcon} alt='' />
					<div>
						<span className={styles.header}>Петрозаводск</span>
						<span className={styles.body}>Карелия, Россия</span>
					</div>
				</div>
				<div className={styles.locationItem} onClick={changeLocation} value='Петропавловск-Камчатский'>
					<img src={pointIcon} alt='' />
					<div>
						<span className={styles.header}>Петропавловск-Камчатский</span>
						<span className={styles.body}>Камчатка, Россия</span>
					</div>
				</div>
				<div className={styles.locationItem} onClick={changeLocation} value='Петергоф'>
					<img src={pointIcon} alt='' />
					<div>
						<span className={styles.header}>Петергоф</span>
						<span className={styles.body}>Санкт-Петербург, Россия</span>
					</div>
				</div>
			</div>
		</div>
	)
}

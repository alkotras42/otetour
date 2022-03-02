import React, { useState } from 'react'
import cn from 'classnames'
import styles from './Calendar.module.css'
import { Input } from '../Input/Input'
import arrowLeft from './arrowLeft.svg'
import arrowRight from './arrowRight.svg'
import calendarIcon from './calendarIcon.svg'

export const Calendar = ({ className, type, ...props }) => {
	const [year, setYear] = useState(new Date().getFullYear())

	const [date, setDate] = useState('')

	const [showPicker, setShowPicker] = useState(false)

	const changeDate = (e) => {
		setDate(e.target.innerText + ' ' + year)
		setShowPicker(false)
	}

	const Months = [
		'Январь',
		'Февраль',
		'Март',
		'Апрель',
		'Май',
		'Июнь',
		'Июль',
		'Август',
		'Сентябрь',
		'Октябрь',
		'Ноябрь',
		'Декабрь',
	]

	return (
		<div className={cn(className, styles.calendar)} {...props}>
			<div>
				<img src={calendarIcon} alt='' className={styles.calendarIcon} />
				<Input
					className={styles.calendarInput}
					placeholder='Когда'
					value={date}
					onClick={() => setShowPicker(!showPicker)}
					readOnly
				></Input>
			</div>
			<div
				className={cn(styles.calendarPicker, {
					[styles.hide]: !showPicker,
				})}
			>
				<div className={styles.calendarYear}>
					<img
						src={arrowLeft}
						alt=''
						className={cn(styles.arrowLeft, {
							[styles.arrowDisable]: year <= new Date().getFullYear(),
						})}
						onClick={() => setYear(year - 1)}
					/>

					<span className={styles.calendarCount}>{year}</span>
					<img
						src={arrowRight}
						alt=''
						className={cn(styles.arrowRight, {
							[styles.arrowDisable]: year > new Date().getFullYear() + 3,
						})}
						onClick={() => setYear(year + 1)}
					/>
				</div>
				{Months.map((month, index) =>
					// Если номер месяца меньшще чем номер текущего месяца, то отрисовываем его как неактивный
					index + 1 < new Date().getMonth() && year == new Date().getFullYear() ? (
						<div className={cn(styles.calendarItem, styles.calendarDisableItem)}>{month}</div>
					) : (
						<div className={styles.calendarItem} onClick={changeDate}>
							{month}
						</div>
					)
				)}
			</div>
		</div>
	)
}

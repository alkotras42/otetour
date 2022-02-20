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

	return (
		<div className={styles.calendar}>
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
					<img src={arrowLeft} alt='' className={styles.arrowLeft} onClick={() => setYear(year - 1)} />
					<span className={styles.calendarCount}>{year}</span>
					<img src={arrowRight} alt='' className={styles.arrowRight} onClick={() => setYear(year + 1)} />
				</div>
				<div className={styles.calendarItem} onClick={changeDate}>
					Январь
				</div>
				<div className={styles.calendarItem} onClick={changeDate}>
					Февраль
				</div>
				<div className={styles.calendarItem} onClick={changeDate}>
					Март
				</div>
				<div className={styles.calendarItem} onClick={changeDate}>
					Апрель
				</div>
				<div className={styles.calendarItem} onClick={changeDate}>
					Май
				</div>
				<div className={styles.calendarItem} onClick={changeDate}>
					Июнь
				</div>
				<div className={styles.calendarItem} onClick={changeDate}>
					Июль
				</div>
				<div className={styles.calendarItem} onClick={changeDate}>
					Август
				</div>
				<div className={styles.calendarItem} onClick={changeDate}>
					Сентябрь
				</div>
				<div className={styles.calendarItem} onClick={changeDate}>
					Октябрь
				</div>
				<div className={styles.calendarItem} onClick={changeDate}>
					Ноябрь
				</div>
				<div className={styles.calendarItem} onClick={changeDate}>
					Декабрь
				</div>
			</div>
		</div>
	)
}

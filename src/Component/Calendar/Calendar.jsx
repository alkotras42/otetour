import React, { useState } from 'react'
import cn from 'classnames'
import styles from './Calendar.module.css'
import { Input } from '../Input/Input'
import arrowLeft from './arrowLeft.svg'
import arrowRight from './arrowRight.svg'

export const Calendar = ({ className, type, ...props }) => {
	return (
		<div className={styles.calendar}>
			<Input className={styles.calendarInput} placeholder='Когда'></Input>
			<div className={styles.calendarPicker}>
				<img src={arrowLeft} alt='' className={styles.arrowLeft} />
				<span className={styles.calendarYear}>2022</span>
				<img src={arrowRight} alt='' />
				<div className={styles.calendarItem}>Январь</div>
				<div className={styles.calendarItem}>Февраль</div>
				<div className={styles.calendarItem}>Март</div>
				<div className={styles.calendarItem}>Апрель</div>
				<div className={styles.calendarItem}>Май</div>
				<div className={styles.calendarItem}>Июнь</div>
				<div className={styles.calendarItem}>Июль</div>
				<div className={styles.calendarItem}>Август</div>
				<div className={styles.calendarItem}>Сентябрь</div>
				<div className={styles.calendarItem}>Октябрь</div>
				<div className={styles.calendarItem}>Ноябрь</div>
				<div className={styles.calendarItem}>Декабрь</div>
			</div>
		</div>
	)
}

import React, { useState } from 'react'
import { Input, TextArea } from '../../../../../Component'
import styles from '../AddTour.module.css'
import cn from 'classnames'
import PlusIcon from '../plusIcon.svg'
import PhotoIcon from '../photo.svg'

const ThirdStep = ({ className, ...props }) => {
	return (
		<div className={className} {...props}>
			<p className={styles.blockTitle}>Описание тура</p>
			<p>Задайте краткое, но понятное описание тура.</p>
			<TextArea placeholder='Описание тура' />
			<p className={styles.blockTitle}>Фотографии</p>
			<p>Добавьте до 10 изображений, показывающих основные впечатления тура.</p>
			<img className={styles.addPhoto} src={PhotoIcon} alt='' />
			<p className={styles.blockTitle}>Программа по дням</p>
			<p>Распишите подробную программу по дням, добавьте фотографии.</p>
			<div className={styles.dayItem}>
				<p className={styles.dayNumber}>1 день</p>
				<div className={styles.dayDescription}>
					<img className={styles.addPhoto} src={PhotoIcon} alt='' />
					<TextArea placeholder='Описание дня' />
				</div>
			</div>
			<div className={styles.addBlock}>
				<img src={PlusIcon} alt='' />
				<p>Добавить день</p>
			</div>
		</div>
	)
}

export default ThirdStep

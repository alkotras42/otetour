import React, { useState } from 'react'
import { Input } from '../../../../../Component'
import styles from '../AddTour.module.css'
import cn from 'classnames'
import PlusIcon from '../plusIcon.svg'

const SecondStep = ({ className, ...props }) => {
	return (
		<div className={className} {...props}>
			<p className={styles.blockTitle}>Даты тура</p>
			<div className={styles.twoInputs}>
				<Input placeholder='С' />
				<Input placeholder='До' />
			</div>
			<div className={styles.places}>
				<span>Осталось мест</span>
				<Input placeholder='Количество мест' />
				<span>из</span>
				<Input placeholder='Всего мест' value={20} />
			</div>
			<Input placeholder='Стоимость' />
			<p>
				*Комиссия за использование платформы составит <span className={styles.redSpan}>1 250 ₽</span> за каждого туриста,
				купившего этот тур.
			</p>
			<Input placeholder='Предоплата' />
			<div className={styles.twoInputs}>
				<Input placeholder='Дата предоплаты' />
				<Input placeholder='Дата постоплаты' />
			</div>
			<Input placeholder='Скидка' />
			<div className={styles.addBlock}>
				<img src={PlusIcon} alt='' />
				<p>Добавить путешественника</p>
			</div>
		</div>
	)
}

export default SecondStep

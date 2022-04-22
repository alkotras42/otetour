import React, { useState } from 'react'
import { Input } from '../../../../../Component'
import styles from '../AddTour.module.css'
import cn from 'classnames'

const FirstStep = ({ className, ...props }) => {
	const [selectedDiff, setSelectedDiff] = useState(null)
	return (
		<div className={className} {...props}>
			<Input placeholder='Название' />
			<Input placeholder='Тип тура' />
			<p className={styles.blockTitle}>Краткая информация</p>
			<p>
				Оцените сложность тура по системе от 1 до 5, где 1 — очень легко, 5 — очень сложно. Поставьте примерный возраст
				участия, исходя из сложности тура и возрастных ограничений.
			</p>
			<Input placeholder='Страна' />
			<Input placeholder='Регион' />
			<Input placeholder='Город' />
			<div className={styles.twoInputs}>
				<Input placeholder='Длительность тура' />
				<Input placeholder='Размер группы' />
			</div>
			<Input placeholder='Язык группы' />
			<Input placeholder='Стоимость тура' />
			<p>
				*Комиссия за использование платформы составит <span className={styles.redSpan}>1 250 ₽</span> за каждого туриста,
				купившего этот тур.
			</p>
			<div className={styles.difficulty}>
				<span>Сложность тура</span>
				<div className={styles.diffContainer}>
					{[...Array(5).keys()].map((item, i) => (
						<div
							onClick={() => setSelectedDiff(i)}
							className={cn(styles.diffItem, {
								[styles.activeItem]: selectedDiff == i,
							})}
							key={i}
						>
							{i + 1}
						</div>
					))}
				</div>
			</div>
			<div className={styles.ages}>
				<p>Возраст участия</p>
				<div className={styles.twoInputs}>
					<Input placeholder='Длительность тура' />
					<Input placeholder='Размер группы' />
				</div>
			</div>
		</div>
	)
}

export default FirstStep

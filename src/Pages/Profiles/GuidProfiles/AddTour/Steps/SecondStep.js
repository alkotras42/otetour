import React, { useEffect, useState } from 'react'
import { Button, Input } from '../../../../../Component'
import styles from '../AddTour.module.css'
import cn from 'classnames'
import PlusIcon from '../plusIcon.svg'
import { useFieldArray, useWatch } from 'react-hook-form'
import CloseIcon from '../closeIcon.svg'

const SecondStep = ({ className, control, register, formStep, setFormStep, ...props }) => {
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'dates',
	})

	const value = useWatch({
		control,
		name: `dates`,
	})

	const addDate = () => {
		append({})
	}

	const nextStep = async (e) => {
		e.preventDefault()
		// const result = await trigger()
		// console.log(result)
		setFormStep((prev) => prev + 1)
		document.documentElement.scrollTop = 0
	}

	const prevStep = (e) => {
		e.preventDefault()
		setFormStep((prev) => prev - 1)
		document.documentElement.scrollTop = 0
	}

	return (
		<div className={className} {...props}>
			<p className={styles.blockTitle}>Даты тура</p>
			{fields.map((field, index) => (
				<div key={field.id} className={styles.dateItem}>
					{index > 0 && <img className={styles.closeIcon} src={CloseIcon} alt='' onClick={() => remove(index)} />}
					<div className={styles.twoInputs}>
						<Input
							placeholder='С'
							{...register(`dates.${index}.dateFrom`, { required: 'Введите дату' })}
							filled={value[index]?.dateFrom}
						/>
						<Input placeholder='До' {...register(`dates.${index}.dateTo`)} filled={value[index]?.dateTo} />
					</div>
					<div className={styles.places}>
						<span>Осталось мест</span>
						<Input
							placeholder='Количество мест'
							name='placesRemain'
							{...register(`dates.${index}.placesRemain`)}
							filled={value[index]?.placesRemain}
						/>
						<span>из</span>
						<Input
							placeholder='Всего мест'
							name='placesTotal'
							{...register(`dates.${index}.placesTotal`)}
							filled={value[index]?.placesTotal}
						/>
					</div>
					<Input placeholder='Стоимость' name='price' {...register(`dates.${index}.price`)} filled={value[index]?.price} />
					<p>
						*Комиссия за использование платформы составит <span className={styles.redSpan}>1 250 ₽</span> за каждого туриста,
						купившего этот тур.
					</p>
					<Input
						placeholder='Предоплата'
						name='prepay'
						{...register(`dates.${index}.prepay`)}
						filled={value[index]?.prepay}
					/>
					<div className={styles.twoInputs}>
						<Input
							placeholder='Дата предоплаты'
							name='prepayday'
							{...register(`dates.${index}.prepayday`)}
							filled={value[index]?.prepayday}
						/>
						<Input
							placeholder='Дата постоплаты'
							name='payday'
							{...register(`dates.${index}.payday`)}
							filled={value[index]?.payday}
						/>
					</div>
					<Input placeholder='Скидка' name='sale' {...register(`dates.${index}.sale`)} filled={value[index]?.sale} />
				</div>
			))}
			<div className={styles.addBlock} onClick={addDate}>
				<img src={PlusIcon} alt='' />
				<p>Добавить дату</p>
			</div>
			<div className={styles.buttons}>
				<Button onClick={prevStep}>Предыдущий шаг</Button>
				<Button onClick={nextStep}>Следующий шаг</Button>
			</div>
		</div>
	)
}

export default SecondStep

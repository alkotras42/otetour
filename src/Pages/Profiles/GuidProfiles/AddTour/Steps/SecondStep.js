import React, { useEffect, useState } from 'react'
import { Button, Input } from '../../../../../Component'
import styles from '../AddTour.module.css'
import cn from 'classnames'
import PlusIcon from '../plusIcon.svg'
import { useFieldArray, useFormState, useWatch } from 'react-hook-form'
import CloseIcon from '../closeIcon.svg'

const SecondStep = ({ className, control, register, formStep, setFormStep, trigger, ...props }) => {
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'dates',
	})

	const value = useWatch({
		control,
		name: `dates`,
	})

	const { errors } = useFormState({ control })

	const addDate = () => {
		append({})
	}

	const nextStep = async (e) => {
		e.preventDefault()
		const result = await trigger(['dates'], { shouldFocus: true })
		if (true) {
			setFormStep((prev) => prev + 1)
			document.documentElement.scrollTop = 0
		}
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
							{...register(`dates.${index}.dateFrom`, { required: 'Введите дату начала тура' })}
							filled={value[index]?.dateFrom}
							error={errors.dates && errors.dates[index]?.dateFrom}
						/>
						<Input
							placeholder='До'
							{...register(`dates.${index}.dateTo`, { required: 'Введите дату конца тура' })}
							filled={value[index]?.dateTo}
							error={errors.dates && errors.dates[index]?.dateTo}
						/>
					</div>
					<div className={styles.places}>
						<span>Осталось мест</span>
						<Input
							placeholder='Количество мест'
							name='placesRemain'
							{...register(`dates.${index}.placesRemain`, {
								required: 'Введите количество мест',
								pattern: { value: /^[0-9]+$/, message: 'Значение должно быть числом' },
							})}
							filled={value[index]?.placesRemain}
							error={errors.dates && errors.dates[index]?.placesRemain}
						/>
						<span>из</span>
						<Input
							placeholder='Всего мест'
							name='placesTotal'
							{...register(`dates.${index}.placesTotal`, {
								required: 'Введите полное число мест',
								pattern: { value: /^[0-9]+$/, message: 'Значение должно быть числом' },
							})}
							filled={value[index]?.placesTotal}
							error={errors.dates && errors.dates[index]?.placesTotal}
						/>
					</div>
					<Input
						placeholder='Стоимость'
						name='price'
						{...register(`dates.${index}.price`, {
							required: 'Введите цену',
							pattern: { value: /^[0-9]+$/, message: 'Значение должно быть числом' },
						})}
						filled={value[index]?.price}
						error={errors.dates && errors.dates[index]?.price}
					/>
					<p>
						*Комиссия за использование платформы составит <span className={styles.redSpan}>1 250 ₽</span> за каждого туриста,
						купившего этот тур.
					</p>
					<Input
						placeholder='Предоплата'
						name='prepay'
						{...register(`dates.${index}.prepay`, {
							required: 'Введите сумму предоплаты',
							pattern: { value: /^[0-9]+$/, message: 'Значение должно быть числом' },
						})}
						filled={value[index]?.prepay}
						error={errors.dates && errors.dates[index]?.prepay}
					/>
					<div className={styles.twoInputs}>
						<Input
							placeholder='Дата предоплаты'
							name='prepayday'
							{...register(`dates.${index}.prepayday`, { required: 'Введите дату предоплаты' })}
							filled={value[index]?.prepayday}
							error={errors.dates && errors.dates[index]?.prepayday}
						/>
						<Input
							placeholder='Дата постоплаты'
							name='payday'
							{...register(`dates.${index}.payday`, { required: 'Введите дату постоплаты' })}
							filled={value[index]?.payday}
							error={errors.dates && errors.dates[index]?.payday}
						/>
					</div>
					<Input
						placeholder='Скидка'
						name='sale'
						{...register(`dates.${index}.sale`, {
							pattern: {
								value: /^[0-9]+$/,
								message: 'Значение должно быть числом',
							},
						})}
						filled={value[index]?.sale}
						error={errors.dates && errors.dates[index]?.sale}
					/>
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

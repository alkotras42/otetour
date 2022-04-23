import React, { useState } from 'react'
import { Button, Input, TextArea } from '../../../../../Component'
import styles from '../AddTour.module.css'
import cn from 'classnames'
import PlusIcon from '../plusIcon.svg'
import PhotoIcon from '../photo.svg'
import { useFieldArray, useFormState, useWatch } from 'react-hook-form'
import CloseIcon from '../closeIcon.svg'

const ThirdStep = ({ className, control, register, formStep, setFormStep, trigger, ...props }) => {
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'days',
	})

	const value = useWatch({
		control,
	})
	const { errors } = useFormState({ control })

	const addDay = () => {
		append({})
	}

	const nextStep = async (e) => {
		e.preventDefault()
		const result = await trigger(['description', 'days'], { shouldFocus: true })
		if (result) {
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
			<p className={styles.blockTitle}>Описание тура</p>
			<p>Задайте краткое, но понятное описание тура.</p>
			<TextArea
				placeholder='Описание тура'
				{...register('description', { required: 'Введите описание тура' })}
				filled={value.description}
				error={errors.description}
			/>
			<p className={styles.blockTitle}>Фотографии</p>
			<p>Добавьте до 10 изображений, показывающих основные впечатления тура.</p>
			<img className={styles.addPhoto} src={PhotoIcon} alt='' />
			<p className={styles.blockTitle}>Программа по дням</p>
			<p>Распишите подробную программу по дням, добавьте фотографии.</p>
			{fields.map((field, index) => (
				<div key={field.id} className={styles.dayItem}>
					<div className={styles.dayTitle}>
						<p className={styles.dayNumber}>{`${index + 1} день`}</p>
						{index > 0 && <img className={styles.closeIcon} src={CloseIcon} alt='' onClick={() => remove(index)} />}
					</div>
					<div className={styles.dayDescription}>
						<img className={styles.addPhoto} src={PhotoIcon} alt='' />
						<TextArea
							placeholder='Описание дня'
							{...register(`days.${index}.dayDescription`, { required: 'Введите описание дня' })}
							filled={value?.days[index]?.dayDescription}
							error={errors.days && errors.days[index]?.dayDescription}
						/>
					</div>
				</div>
			))}
			<div className={styles.addBlock} onClick={addDay}>
				<img src={PlusIcon} alt='' />
				<p>Добавить день</p>
			</div>
			<div className={styles.buttons}>
				<Button onClick={prevStep}>Предыдущий шаг</Button>
				<Button onClick={nextStep}>Следующий шаг</Button>
			</div>
		</div>
	)
}

export default ThirdStep

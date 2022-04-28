import React, { forwardRef, useState } from 'react'
import { Button, Input } from '../../../../../Component'
import styles from '../AddTour.module.css'
import cn from 'classnames'
import { useFieldArray, useWatch, Controller, useFormState } from 'react-hook-form'

const DiffPiker = forwardRef(({ value, setValue, error }, ref) => {
	return (
		<div className={styles.difficulty}>
			<span>Сложность тура</span>
			<div ref={ref} className={styles.diffContainer}>
				{[...Array(5).keys()].map((item, i) => (
					<div
						onClick={() => setValue(i)}
						className={cn(styles.diffItem, {
							[styles.activeItem]: value == i,
							[styles.diffError]: error,
						})}
						key={i}
					>
						{i + 1}
					</div>
				))}
			</div>
			{error && <p className={styles.error}>{error.message}</p>}
		</div>
	)
})

const FirstStep = ({ className, register, control, formStep, setFormStep, trigger, ...props }) => {
	const value = useWatch({
		control,
	})

	const nextStep = async (e) => {
		e.preventDefault()
		const result = await trigger(
			[
				'title',
				'type',
				'country',
				'tourLength',
				'groupSize',
				'groupLanguage',
				'tourPrice',
				'ageFrom',
				'ageTo',
				'difficulty',
			],
			{ shouldFocus: true }
		)
		if (result) {
			setFormStep((prev) => prev + 1)
			document.documentElement.scrollTop = 0
		}
	}

	const { errors } = useFormState({ control })

	return (
		<div className={className} {...props}>
			<Input
				placeholder='Название'
				{...register('title', { required: 'Введите название тура' })}
				filled={value.title}
				error={errors.title}
			/>
			<Input
				placeholder='Тип тура'
				{...register('type', { required: 'Введите тип тура' })}
				filled={value.type}
				error={errors.type}
			/>
			<p className={styles.blockTitle}>Краткая информация</p>
			<p>
				Оцените сложность тура по системе от 1 до 5, где 1 — очень легко, 5 — очень сложно. Поставьте примерный возраст
				участия, исходя из сложности тура и возрастных ограничений.
			</p>
			<Input
				placeholder='Страна'
				{...register('country', { required: 'Введите страну' })}
				filled={value.country}
				error={errors.country}
			/>
			<Input disabled placeholder='Регион' {...register('region')} filled={value.region} error={errors.region} />
			<Input disabled placeholder='Город' {...register('city')} filled={value.city} error={errors.city} />
			<div className={styles.twoInputs}>
				<Input
					placeholder='Длительность тура'
					{...register('tourLength', { required: 'Введите длительность тура' })}
					filled={value.tourLength}
					error={errors.tourLength}
				/>
				<Input
					placeholder='Размер группы'
					{...register('groupSize', { required: 'Введите размер группы' })}
					filled={value.groupSize}
					error={errors.groupSize}
				/>
			</div>
			<Input
				placeholder='Язык группы'
				{...register('groupLanguage', { required: 'Введите язык группы' })}
				filled={value.groupLanguage}
				error={errors.groupLanguage}
			/>
			<Input
				placeholder='Стоимость тура'
				{...register('tourPrice', { required: 'Введите стоимость тура' })}
				filled={value.tourPrice}
				error={errors.tourPrice}
			/>
			<p>
				*Комиссия за использование платформы составит <span className={styles.redSpan}>1 250 ₽</span> за каждого туриста,
				купившего этот тур.
			</p>
			<Controller
				render={({ field }) => <DiffPiker value={field.value} setValue={field.onChange} error={errors.difficulty} />}
				name='difficulty'
				control={control}
				rules={{ required: 'Укажите сложность тура' }}
			/>

			<div className={styles.ages}>
				<p>Возраст участия</p>
				<div className={styles.twoInputs}>
					<Input
						placeholder='От'
						{...register('ageFrom', { required: 'Введите минимальный возраст участия' })}
						filled={value.ageFrom}
						error={errors.ageFrom}
					/>
					<Input
						placeholder='До'
						{...register('ageTo', { required: 'Введите максимальный возраст участия' })}
						filled={value.ageTo}
						error={errors.ageTo}
					/>
				</div>
			</div>
			<div className={styles.buttons}>
				<Button disabled>Предыдущий шаг</Button>
				<Button onClick={nextStep}>Следующий шаг</Button>
			</div>
		</div>
	)
}

export default FirstStep

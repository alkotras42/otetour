import React, { forwardRef, useEffect, useState } from 'react'
import { Button, Input, Select } from '../../../../../Component'
import styles from '../AddTour.module.css'
import cn from 'classnames'
import { useFieldArray, useWatch, Controller, useFormState } from 'react-hook-form'
import { getCitiesOfCountry, getCitiesOfRegion, getCountries, getRegions } from '../../../../../Api/Locations'
import { getCategories } from '../../../../../Api/Categories'

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
	const [categories, setCategories] = useState({})
	const [counties, setCounties] = useState({})
	const [regions, setRegions] = useState({})
	const [cities, setCities] = useState({})

	const value = useWatch({
		control,
	})

	// Получить регионы и катерогии при изменении страны
	useEffect(() => {
		;(async () => {
			if (value?.country) {
				setRegions(await getRegions(value.country))
				setCities(await getCitiesOfCountry(value.country))
			}
		})()
	}, [value?.country])

	// Получить города при изменении региона
	useEffect(() => {
		;(async () => {
			if (value.region) {
				setCities(await getCitiesOfRegion(value.country, value.region))
			}
		})()
	}, [value.region])

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
		if (true) {
			setFormStep((prev) => prev + 1)
			document.documentElement.scrollTop = 0
		}
	}

	const getCountiesOptions = async () => {
		if (!counties.length) {
			setCounties(await getCountries())
		}
	}

	const getCategoriesOptions = async () => {
		if (!categories.length) {
			setCategories(await getCategories())
		}
	}

	const { errors } = useFormState({ control })

	return (
		<div className={className} {...props}>
			<Select
				placeholder='Тип тура'
				{...register('type', { required: 'Введите тип тура' })}
				options={categories}
				onClick={getCategoriesOptions}
				filled={value.type}
				error={errors.type}
			/>
			<p className={styles.blockTitle}>Краткая информация</p>
			<p>
				Оцените сложность тура по системе от 1 до 5, где 1 — очень легко, 5 — очень сложно. Поставьте примерный возраст
				участия, исходя из сложности тура и возрастных ограничений.
			</p>
			<Select
				placeholder='Страна'
				{...register('country', { required: 'Введите страну' })}
				onClick={getCountiesOptions}
				options={counties}
				filled={value.country}
				error={errors.country}
			/>
			<Select
				disabled={!value.country || regions.length == 0}
				placeholder='Регион'
				{...register('region')}
				options={regions}
				filled={regions?.length !== 0 && value.region}
				error={errors.region}
			/>
			<Select
				disabled={!value.country || cities.length == 0}
				placeholder='Город'
				{...register('city')}
				options={cities}
				filled={cities?.length !== 0 && value.city}
				error={errors.city}
			/>
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
					<Input placeholder='От' {...register('ageFrom')} filled={value.ageFrom} error={errors.ageFrom} />
					<Input placeholder='До' {...register('ageTo')} filled={value.ageTo} error={errors.ageTo} />
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

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
			if (value?.country_id) {
				setRegions(await getRegions(value.country_id))
				setCities(await getCitiesOfCountry(value.country_id))
			}
		})()
	}, [value?.country_id])

	// Получить города при изменении региона
	useEffect(() => {
		;(async () => {
			if (value.region_id) {
				setCities(await getCitiesOfRegion(value.country_id, value.region_id))
			}
		})()
	}, [value.region_id])

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
				{...register('category_id', { required: 'Введите тип тура' })}
				options={categories}
				onClick={getCategoriesOptions}
				filled={value.category_id}
				error={errors.category_id}
			/>
			<p className={styles.blockTitle}>Краткая информация</p>
			<p>
				Оцените сложность тура по системе от 1 до 5, где 1 — очень легко, 5 — очень сложно. Поставьте примерный возраст
				участия, исходя из сложности тура и возрастных ограничений.
			</p>
			<Select
				placeholder='Страна'
				{...register('country_id', { required: 'Введите страну' })}
				onClick={getCountiesOptions}
				options={counties}
				filled={value.country_id}
				error={errors.country_id}
			/>
			<Select
				disabled={!value.country_id || regions.length == 0}
				placeholder='Регион'
				{...register('region_id')}
				options={regions}
				filled={regions?.length !== 0 && value.region_id}
				error={errors.region_id}
			/>
			<Select
				disabled={!value.country_id || cities.length == 0}
				placeholder='Город'
				{...register('city_id')}
				options={cities}
				filled={cities?.length !== 0 && value.city_id}
				error={errors.city_id}
			/>

			<Input
				placeholder='Длительность тура'
				{...register('length_days', {
					required: 'Введите длительность тура',
					pattern: {
						value: /^[0-9]+$/,
						message: 'Значение должно быть числом',
					},
					min: {value: 1, message: 'Минимальная длинна тура - 1 день'},
					max: {value: 30, message: 'Максимальная длинна тура - 30 дней'}
				})}
				filled={value.length_days}
				error={errors.length_days}
			/>

			<Controller
				render={({ field }) => <DiffPiker value={field.value} setValue={field.onChange} error={errors.difficulty} />}
				name='difficulty'
				control={control}
				rules={{ required: 'Укажите сложность тура' }}
			/>

			<div className={styles.ages}>
				<p>Возраст участия</p>
				<div className={styles.twoInputs}>
					<Input placeholder='От' {...register('age_min')} filled={value.age_min} error={errors.age_min} />
					<Input placeholder='До' {...register('age_max')} filled={value.age_max} error={errors.age_max} />
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

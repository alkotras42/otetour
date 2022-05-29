import React, { forwardRef, useEffect, useState } from 'react'
import { Button, Input, CustomSelect, CustomSelectWithSearch } from '../../../../../Component'
import styles from '../AddTour.module.css'
import cn from 'classnames'
import { useFieldArray, useWatch, Controller, useFormState } from 'react-hook-form'
import { getCitiesOfCountry, getCitiesOfRegion, getCountries, getRegions } from '../../../../../Api/Locations'
import { getCategories } from '../../../../../Api/Categories'
import { getAccomodations } from '../../../../../Api/Accomodation'

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

const FirstStep = ({
	className,
	register,
	control,
	formStep,
	setFormStep,
	setError,
	clearErrors,
	setValue,
	trigger,
	...props
}) => {
	const [categories, setCategories] = useState({})
	const [accomodations, setAccomodations] = useState({})
	const [counties, setCounties] = useState({})
	const [regions, setRegions] = useState({})
	const [cities, setCities] = useState({})
	const [activeLanguages, setActiveLanguages] = useState({
		ru: false,
		en: false,
		fr: false,
		es: false,
		it: false,
		de: false,
	})

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

	useEffect(() => {
		getCountiesOptions()
	}, [value.country_id])

	useEffect(() => {
		getCategoriesOptions()
	}, [value.category_id])

	useEffect(() => {
		getAccomodationsOptions()
	}, [value.accommodation_id])

	const nextStep = async (e) => {
		e.preventDefault()
		const result = await trigger(['category_id', 'accommodation_id', 'country_id', 'length_days', 'difficulty'], {
			shouldFocus: true,
		})
		if (result) {
			setFormStep((prev) => prev + 1)
			document.documentElement.scrollTop = 0
		}
	}

	useEffect(() => {
		if (value.age_min && value.age_max && +value.age_max < +value.age_min) {
			setError('age_min', {
				type: 'custom',
				message: 'Не может быть больше максимального введеного возраста',
			})
		} else {
			clearErrors('age_min')
		}
		if (value.age_min < 18) {
			setError('age_min', {
				type: 'min',
				message: 'Минимальный допустимый возраст - 18 лет',
			})
		} else {
			clearErrors('age_min')
		}
	}, [value.age_min, value.age_max])

	const getCountiesOptions = async () => {
		if (!counties.length) {
			setCounties(JSON.parse(localStorage.getItem('config')).countries)
		}
	}

	const getCategoriesOptions = async () => {
		if (!categories.length) {
			setCategories(await getCategories())
		}
	}

	const getAccomodationsOptions = async () => {
		if (!accomodations.length) {
			setAccomodations(await getAccomodations())
		}
	}

	const { errors } = useFormState({ control })

	const handleLanguageChange = (e) => {
		const language = e.target.getAttribute('id')
		const tmp = { ...activeLanguages }
		tmp[language] = !tmp[language]
		setActiveLanguages(tmp)
		tmp[language] ? setValue(language, [{}]) : setValue(language, undefined) // Если язык поменялся на true, то он добавляется в форму
	}

	return (
		<div className={className} {...props}>
			<Controller
				control={control}
				name='category_id'
				render={({ field }) => (
					<CustomSelectWithSearch
						placeholder='Тип тура'
						onChange={(v) => field.onChange(v.id)}
						options={categories}
						onClick={getCategoriesOptions}
						value={field.value}
						error={errors.category_id}
					/>
				)}
				rules={{
					required: 'Выберите тип тура',
				}}
			/>
			<Controller
				control={control}
				name='accommodation_id'
				render={({ field }) => (
					<CustomSelectWithSearch
						placeholder='Тип проживания'
						onChange={(v) => field.onChange(v.id)}
						options={accomodations}
						onClick={getAccomodationsOptions}
						value={field.value}
						error={errors.accommodation_id}
					/>
				)}
				rules={{
					required: 'Выберите тип проживания',
				}}
			/>
			<p className={styles.blockTitle}>Краткая информация</p>
			<p>
				Оцените сложность тура по системе от 1 до 5, где 1 — очень легко, 5 — очень сложно. Поставьте примерный возраст
				участия, исходя из сложности тура и возрастных ограничений.
			</p>
			<Controller
				control={control}
				name='country_id'
				render={({ field }) => (
					<CustomSelectWithSearch
						placeholder='Страна'
						onChange={(v) => field.onChange(v.id)}
						onClick={getCountiesOptions}
						options={counties}
						value={value.country_id}
						error={errors.country_id}
					/>
				)}
				rules={{
					required: 'Выберите страну',
				}}
			/>
			<Controller
				control={control}
				name='region_id'
				render={({ field }) => (
					<CustomSelectWithSearch
						placeholder='Регион'
						onChange={(v) => field.onChange(v.id)}
						disabled={!value.country_id || regions.length == 0}
						options={regions}
						value={regions?.length !== 0 && value.region_id}
						error={errors.region_id}
					/>
				)}
			/>

			<Controller
				control={control}
				name='city_id'
				render={({ field }) => (
					<CustomSelectWithSearch
						placeholder='Город'
						onChange={(v) => field.onChange(v.id)}
						disabled={!value.country_id || cities.length == 0}
						options={cities}
						value={cities?.length !== 0 && value.city_id}
						error={errors.city_id}
					/>
				)}
			/>

			<Input
				placeholder='Длительность тура'
				{...register('length_days', {
					required: 'Введите длительность тура',
					pattern: {
						value: /^[0-9]+$/,
						message: 'Значение должно быть числом',
					},
					min: { value: 1, message: 'Минимальная длинна тура - 1 день' },
					max: { value: 30, message: 'Максимальная длинна тура - 30 дней' },
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
					<Input
						placeholder='От'
						{...register('age_min', {
							min: {
								value: 18,
								message: 'Минимальный допустимый возраст - 18 лет',
							},
							max: {
								value: 99,
								message: 'Максимальный допустимый возраст - 99 лет',
							},
							max: {
								value: value.age_max,
								message: 'Не может быть больше максимального введеного возраста',
							},
						})}
						filled={value.age_min}
						error={errors.age_min}
					/>
					<Input
						placeholder='До'
						{...register('age_max', {
							min: {
								value: 18,
								message: 'Минимальный допустимый возраст - 18 лет',
							},
							max: {
								value: 99,
								message: 'Максимальный допустимый возраст - 99 лет',
							},
							min: {
								value: value.age_min,
								message: 'Не может быть меньшь минимального введеного возраста',
							},
						})}
						filled={value.age_max}
						error={errors.age_max}
					/>
				</div>
			</div>
			<p className={styles.blockTitle}>Языки тура</p>
			<div className={styles.checkBoxContainer}>
				<label className={styles.checkBoxItem}>
					<input id='ru' checked={activeLanguages.ru} onChange={handleLanguageChange} type='checkbox' />
					Русский
				</label>
				<label className={styles.checkBoxItem}>
					<input id='en' checked={activeLanguages.en} onChange={handleLanguageChange} type='checkbox' />
					Английский
				</label>
				<label className={styles.checkBoxItem}>
					<input id='fr' checked={activeLanguages.fr} onChange={handleLanguageChange} type='checkbox' />
					Французский
				</label>
				<label className={styles.checkBoxItem}>
					<input id='es' checked={activeLanguages.es} onChange={handleLanguageChange} type='checkbox' />
					Испанский
				</label>
				<label className={styles.checkBoxItem}>
					<input id='it' checked={activeLanguages.it} onChange={handleLanguageChange} type='checkbox' />
					Итальянский
				</label>
				<label className={styles.checkBoxItem}>
					<input id='de' checked={activeLanguages.de} onChange={handleLanguageChange} type='checkbox' />
					Немецкий
				</label>
			</div>
			<div className={styles.buttons}>
				<Button disabled>Предыдущий шаг</Button>
				<Button onClick={nextStep}>Следующий шаг</Button>
			</div>
		</div>
	)
}

export default FirstStep

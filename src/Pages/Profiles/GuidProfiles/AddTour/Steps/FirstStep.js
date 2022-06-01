import React, { forwardRef, useEffect, useState } from 'react'
import { Button, Input, CustomSelect, CustomSelectWithSearch } from '../../../../../Component'
import styles from '../AddTour.module.css'
import cn from 'classnames'
import { useFieldArray, useWatch, Controller, useFormState } from 'react-hook-form'
import { getCitiesOfCountry, getCitiesOfRegion, getCountries, getRegions } from '../../../../../Api/Locations'
import { getCategories } from '../../../../../Api/Categories'
import { getAccomodations } from '../../../../../Api/Accomodation'
import PhotoIcon from '../photo.svg'
import CloseIcon from '../closeIcon.svg'
import Modal from 'react-modal'
import Dropzone from 'react-dropzone'
import { imageFilter } from '../../../../../Helpers/helpers'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { useRef } from 'react'

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
	activeLanguages,
	setActiveLanguages,
	...props
}) => {
	const [categories, setCategories] = useState({})
	const [accomodations, setAccomodations] = useState({})
	const [counties, setCounties] = useState({})
	const [regions, setRegions] = useState({})
	const [cities, setCities] = useState({})
	const [languageError, setLanguageError] = useState(null)

	const [tourImages, setTourImages] = useState({ modal: false, cropper: '' })

	const [imageError, setImageError] = useState(null)

	const cropperRef = useRef()

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

	useEffect(() => {
		if (+value.age_min && +value.age_max && +value.age_max < +value.age_min) {
			setError('age_min', {
				type: 'custom',
				message: 'Не может быть больше максимального введеного возраста',
			})
		} else {
			clearErrors('age_min')
		}
		if (+value.age_min && +value.age_min < 18) {
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

	const {
		fields: picturesFields,
		append: picturesAppend,
		remove: picturesRemove,
	} = useFieldArray({
		control,
		name: 'pictures',
	})

	const handleTourImageCropp = () => {
		const img = cropperRef?.current
		const cropper = img?.cropper
		setTourImages({ modal: false, cropper: '' })
		picturesAppend(
			cropper
				.getCroppedCanvas({
					maxWidth: 1280,
					maxHeight: 720,
				})
				.toDataURL()
		)
	}

	const handleTourImageDrop = (dropped) => {
		const response = imageFilter(dropped[0])
		if (response.ok) {
			setImageError(null)
			const img = dropped[0]
			const reader = new FileReader()
			reader.onload = (event) => {
				setTourImages({ ...tourImages, cropper: event.target.result })
			}
			reader.readAsDataURL(img)
		} else {
			setImageError(response.message)
		}
	}

	const removeTourImage = (index) => {
		picturesRemove(index)
	}

	const nextStep = async (e) => {
		e.preventDefault()
		const result = await trigger(['category_id', 'accommodation_id', 'country_id', 'length_days', 'difficulty'], {
			shouldFocus: true,
		})
		if (result) {
			if (Object.values(activeLanguages).some((value) => value)) {
				setLanguageError(null)
				let count = 0
				// Если язык не активен увеличиваем счетчик, иначе переключаемся на страницу активного языка
				Object.values(activeLanguages).some((value) => {
					if (!value) {
						count++
					}
					if (value) {
						setFormStep((prev) => prev + 1 + count)
						document.documentElement.scrollTop = 0
						return true
					}
				})
			} else {
				setLanguageError('Выберите как минимум один язык')
			}
		}
	}

	console.log(value)

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
			<div className={styles.twoInputs}>
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
				<Input
					placeholder='Регион (если в списке нет нужного)'
					{...register('region_name')}
					filled={value.region_name}
					error={errors.region_name}
				/>
			</div>

			<div className={styles.twoInputs}>
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
					placeholder='Город (если в списке нет нужного)'
					{...register('city_name')}
					filled={value.city_name}
					error={errors.city_name}
				/>
			</div>

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
			<p className={styles.blockTitle}>Фотографии</p>
			<p>Добавьте до 10 изображений, показывающих основные впечатления тура.</p>
			<div className={styles.tourImages}>
				<>
					{picturesFields &&
						picturesFields.map((field, index) => (
							<div key={field.id} className={styles.tourImageItem}>
								<img src={CloseIcon} alt='' className={styles.tourImageCloseIcon} onClick={() => removeTourImage(index)} />
								<img src={value.pictures?.length && value.pictures[index]} alt='' className={styles.tourImage} />
							</div>
						))}
					{picturesFields.length < 10 ? (
						<img
							className={styles.addPhoto}
							src={PhotoIcon}
							alt=''
							onClick={() => setTourImages({ ...tourImages, modal: true })}
						/>
					) : null}
				</>
			</div>

			<Modal
				isOpen={tourImages.modal}
				onRequestClose={() => setTourImages({ ...tourImages, modal: false })}
				className={styles.modal}
			>
				{tourImages.cropper ? (
					<>
						<Cropper
							style={{ height: 400, width: 900 }}
							ref={cropperRef}
							aspectRatio={15 / 9}
							rotatable={false}
							src={tourImages.cropper}
							viewMode={2}
							zoom={0.7}
							minCropBoxWidth={150}
						/>
						<Button className={styles.croppButton} onClick={handleTourImageCropp}>
							Сохранить
						</Button>
					</>
				) : (
					<>
						{imageError && <p className={styles.error}>{imageError}</p>}
						<Dropzone onDropAccepted={handleTourImageDrop}>
							{({ getRootProps, getInputProps }) => (
								<div {...getRootProps({ className: styles.dropzone })}>
									<div>
										<input {...getInputProps()} />
										<p>Перетащите изобращение сюда или нажмите чтобы выбрать.</p>
									</div>
								</div>
							)}
						</Dropzone>
					</>
				)}
			</Modal>
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
			{languageError && <p className={styles.error}>{languageError}</p>}
			<div className={styles.buttons}>
				<Button disabled>Предыдущий шаг</Button>
				<Button onClick={nextStep}>Следующий шаг</Button>
			</div>
		</div>
	)
}

export default FirstStep

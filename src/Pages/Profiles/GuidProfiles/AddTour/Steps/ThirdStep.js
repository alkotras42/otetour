import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, TextArea } from '../../../../../Component'
import styles from '../AddTour.module.css'
import cn from 'classnames'
import PlusIcon from '../plusIcon.svg'
import PhotoIcon from '../photo.svg'
import CloseIcon from '../closeIcon.svg'
import { useFieldArray, useFormState, useWatch } from 'react-hook-form'
import Modal from 'react-modal'
import Dropzone from 'react-dropzone'
import { imageFilter } from '../../../../../Helpers/helpers'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

const ThirdStep = ({
	className,
	control,
	register,
	formStep,
	setFormStep,
	trigger,
	setValue,
	activeLanguages,
	setActiveLanguages,
	...props
}) => {
	const [program, setProgram] = useState([{ modal: false, cropper: '' }])
	const value = useWatch({
		control,
	})

	const {
		fields: enFields,
		append: enAppend,
		remove: enRemove,
	} = useFieldArray({
		control,
		name: 'en',
	})

	const enValue = useWatch({
		control,
		name: `en`,
	})

	const {
		fields: programFields,
		append: programAppend,
		remove: programRemove,
	} = useFieldArray({
		control,
		name: 'program',
	})

	const {
		fields: servisesFields,
		append: servisesAppend,
		remove: servisesRemove,
	} = useFieldArray({
		control,
		name: 'services',
	})

	const addServise = () => {
		servisesAppend({})
	}

	const {
		fields: questionsFields,
		append: questionsAppend,
		remove: questionsRemove,
	} = useFieldArray({
		control,
		name: 'questions',
	})
	const addQuestion = () => {
		questionsAppend({})
	}

	const { errors, isValid } = useFormState({ control })

	const [imageError, setImageError] = useState(null)
	const cropperRef = useRef()

	const openDayImageModal = (index) => {
		const d = [...program] // create the copy of state array
		d[index] = { ...d[index], modal: true } //new value
		setProgram(d)
	}

	const closeDayImageModal = (index) => {
		setImageError(null)
		const d = [...program] // create the copy of state array
		d[index] = { ...d[index], modal: false } //new value
		setProgram(d)
	}

	const handleDaysImageCropp = (index) => {
		const img = cropperRef?.current
		const cropper = img?.cropper
		const d = [...program] // create the copy of state array
		d[index] = { modal: false, cropper: '' } //new value
		setProgram(d)
		setValue(
			`program[${index}].image`,
			cropper
				.getCroppedCanvas({
					maxWidth: 1280,
					maxHeight: 720,
				})
				.toDataURL()
		)
	}

	const handleDayImageDrop = (dropped, index) => {
		const response = imageFilter(dropped[0])
		if (response.ok) {
			setImageError(null)
			const img = dropped[0]
			const reader = new FileReader()
			reader.onload = (event) => {
				const d = [...program] // create the copy of state array
				d[index] = { modal: true, cropper: event.target.result } //new value
				setProgram(d)
			}
			reader.readAsDataURL(img)
		} else {
			setImageError(response.message)
		}
	}

	const prevStep = (e) => {
		e.preventDefault()
		// Ищем последний активный язык среди предшествующих и переключаемся на него, если такого нет, то переходим на первый этап
		const count = Object.values(activeLanguages)
			.slice(0, formStep - 2)
			.lastIndexOf(true)
		if (count < 0) {
			setFormStep(1)
		} else {
			setFormStep(count + 2)
		}
		document.documentElement.scrollTop = 0
	}

	const nextStep = async (e) => {
		e.preventDefault()
		const result = await trigger(['en'], { shouldFocus: true })
		if (result) {
			if (activeLanguages) {
				let count = 0
				// Если язык не активен увеличиваем счетчик, иначе переключаемся на страницу активного языка
				Object.values(activeLanguages)
					.slice(formStep - 1)
					.some((value) => {
						if (!value) {
							count++
						}
						if (value) {
							setFormStep((prev) => prev + 1 + count)
							document.documentElement.scrollTop = 0
							return true
						}
					})
			}
		}
	}

	return (
		<div className={className} {...props}>
			<div>
				{enFields.map((field, index) => (
					<div key={field.id} className={styles.lngBlock}>
						<p className={styles.languageTitle}>Английский язык</p>
						<Input
							placeholder='Название'
							{...register(`en.${index}.name`, { required: 'Введите название тура' })}
							filled={enValue && enValue[index]?.name}
							error={errors.en && errors.en[index]?.name}
						/>
						<p className={styles.blockTitle}>Описание тура</p>
						<p>Задайте краткое, но понятное описание тура.</p>
						<TextArea
							placeholder='Описание тура'
							{...register(`en.${index}.description`, { required: 'Введите описание тура' })}
							filled={enValue && enValue[index]?.description}
							error={errors.en && errors.en[index]?.description}
						/>
						<p className={styles.blockTitle}>Дополнительная информация</p>
						<p>
							Расскажите о том, какие требования предъявляются к туристам при участии в туре и посещении страны. Обозначьте
							условия отмены — какая сумма вернется к туристу при отмене тура.
						</p>
						<TextArea
							placeholder='Требования к туристам'
							{...register(`en.${index}.terms`, { required: 'Укажите требования к туристам' })}
							filled={enValue && enValue[index]?.terms}
							error={errors.en && errors.en[index]?.terms}
						/>
						<TextArea
							placeholder='Условия отмены'
							{...register(`en.${index}.cancellation`, { required: 'Укажите условия отмены' })}
							filled={enValue && enValue[index]?.cancellation}
							error={errors.en && errors.en[index]?.cancellation}
						/>
						<p className={styles.blockTitle}>Условия</p>
						<p>Распишите по пунктам, что включено в стоимость тура, а что нет.</p>
						<TextArea
							placeholder='Входит в стоимость'
							{...register(`en.${index}.included`, { required: 'Укажите что входит в стоимость' })}
							filled={enValue && enValue[index]?.included}
							error={errors.en && errors.en[index]?.included}
						/>
						<TextArea
							placeholder='Не входит в стоимость'
							{...register(`en.${index}.excluded`, { required: 'Укажите что не входит в стоимость' })}
							filled={enValue && enValue[index]?.excluded}
							error={errors.en && errors.en[index]?.excluded}
						/>
						<p className={styles.blockTitle}>Проживание</p>
						<TextArea
							placeholder='Описание проживания'
							{...register(`en.${index}.accommodation`, { required: 'Введите описание проживания' })}
							filled={enValue && enValue[index]?.accommodation}
							error={errors.en && errors.en[index]?.accommodation}
						/>
						<p className={styles.blockTitle}>Сообщение для туристов</p>
						<p>Вы можете задать приветственное сообщение, которое будет присылаться всем туристам при покупке тура.</p>
						<TextArea
							placeholder='Сообщение'
							{...register(`en.${index}.message`, { required: 'Введите сообщение для туристов' })}
							filled={enValue && enValue[index]?.message}
							error={errors.en && errors.en[index]?.message}
						/>
						<p className={styles.blockTitle}>Программа по дням</p>
						<p>Распишите подробную программу по дням, добавьте фотографии.</p>
						{programFields.map((field, index) => (
							<div key={field.id} className={styles.dayItem}>
								<div className={styles.dayTitle}>
									<p className={styles.dayNumber}>{`${index + 1} день`}</p>
								</div>
								<div className={styles.dayProgram}>
									<img className={styles.addPhoto} src={PhotoIcon} onClick={() => openDayImageModal(index)} alt='' />
									{value.program?.length && value.program[index]?.image && (
										<img className={styles.dayImage} src={value.program[index].image} alt='' />
									)}
									<Modal
										isOpen={program[index]?.modal}
										onRequestClose={() => closeDayImageModal(index)}
										className={styles.modal}
									>
										{program[index]?.cropper ? (
											<>
												<Cropper
													style={{ height: 400, width: 900 }}
													ref={cropperRef}
													// background={false}
													aspectRatio={15 / 9}
													rotatable={false}
													src={program[index].cropper}
													viewMode={2}
													zoom={0.7}
													minCropBoxWidth={150}
													// crop={onCrop}
												/>
												<Button className={styles.croppButton} onClick={() => handleDaysImageCropp(index)}>
													Сохранить
												</Button>
											</>
										) : (
											<>
												{imageError && <p className={styles.error}>{imageError}</p>}
												<Dropzone onDropAccepted={(dropped) => handleDayImageDrop(dropped, index)}>
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

									<TextArea
										placeholder='Описание дня'
										{...register(`en[0].program[${index}].dayProgram`, { required: 'Введите описание дня' })}
										filled={value.en && value.en[0].program?.length && value?.en[0].program[index]?.dayProgram}
										error={errors.en && errors.en[0]?.program && errors.en[0].program[index]?.dayProgram}
									/>
								</div>
							</div>
						))}
						<p className={styles.blockTitle}>Дополнительные услуги</p>
						<p>Обозначьте дополнительные услуги, которые могут быть предоставлены клиентам, укажите их стоимость</p>
						{servisesFields.map((field, index) => (
							<div key={field.id} className={styles.servises}>
								<Input
									placeholder='Услуга'
									{...register(`en[0].services.${index}.service`)}
									filled={value.en && value.en[0].servises?.length !== 0 && value.en[0].services[index].service}
								/>
								<Input
									placeholder='Стоимость'
									{...register(`en[0].services.${index}.servicePrice`)}
									filled={value.en && value.en[0].servises?.length !== 0 && value.en[0].services[index]?.servicePrice}
								/>
								{index > 0 && <img className={styles.closeIcon} src={CloseIcon} alt='' onClick={() => servisesRemove(index)} />}
							</div>
						))}
						<div className={styles.addBlock} onClick={addServise}>
							<img src={PlusIcon} alt='' />
							<p>Добавить услугу</p>
						</div>
						<p className={styles.blockTitle}>Часто задаваемые вопросы</p>
						<p>Распишите вопросы, которые могут возникнуть у пользователей по поводу тура.</p>
						{questionsFields.map((field, index) => (
							<div key={field.id} className={styles.question}>
								{index > 0 && (
									<img className={styles.closeIcon} src={CloseIcon} alt='' onClick={() => questionsRemove(index)} />
								)}
								<Input
									placeholder='Вопрос'
									{...register(`en[0].questions.${index}.question`)}
									filled={value.en && value.en[0].question?.length !== 0 && value.en[0].questions[index]?.question}
								/>
								<TextArea
									placeholder='Ответ'
									{...register(`en[0].questions.${index}.answer`)}
									filled={value.en && value.en[0].question?.length !== 0 && value.en[0].questions[index]?.answer}
								/>
							</div>
						))}

						<div className={styles.addBlock} onClick={addQuestion}>
							<img src={PlusIcon} alt='' />
							<p>Добавить вопрос</p>
						</div>
					</div>
				))}
			</div>

			{Object.values(activeLanguages)
				.slice(formStep - 1)
				.some((language) => language) ? (
				<div className={styles.buttons}>
					<Button onClick={prevStep}>Предыдущий шаг</Button>
					<Button onClick={nextStep}>Следующий шаг</Button>
				</div>
			) : (
				<>
					<div className={styles.buttons}>
						<Button onClick={prevStep}>Предыдущий шаг</Button>
						<Button color='white'>Сохранить в черновики</Button>
					</div>
					<Button type='submit' className={styles.submitButton}>
						Отправить на модерацию
					</Button>
				</>
			)}
		</div>
	)
}

export default ThirdStep

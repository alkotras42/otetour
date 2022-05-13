import React, { useEffect, useRef, useState } from 'react'
import { Button, TextArea } from '../../../../../Component'
import styles from '../AddTour.module.css'
import cn from 'classnames'
import PlusIcon from '../plusIcon.svg'
import PhotoIcon from '../photo.svg'
import { useFieldArray, useFormState, useWatch } from 'react-hook-form'
import CloseIcon from '../closeIcon.svg'
import Modal from 'react-modal'
import Dropzone from 'react-dropzone'
import { imageFilter } from '../../../../../Helpers/helpers'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

const ThirdStep = ({ className, control, register, formStep, setFormStep, trigger, setValue, ...props }) => {
	const [days, setDays] = useState([{ modal: false, cropper: '' }])
	const value = useWatch({
		control,
	})

	useEffect(() => {
		if (value.length_days && value.length_days > 0 && value.length_days <= 30) {
			setDays(Array(+value.length_days).fill({ modal: false, cropper: '' }))
			setValue('days', Array(+value.length_days).fill({}))
		}
	}, [value.length_days])

	const [tourImages, setTourImages] = useState({ modal: false, cropper: '' })

	const [imageError, setImageError] = useState(null)

	const cropperRef = useRef()

	const {
		fields: daysFields,
		append: daysAppend,
		remove: daysRemove,
	} = useFieldArray({
		control,
		name: 'days',
	})

	const {
		fields: picturesFields,
		append: picturesAppend,
		remove: picturesRemove,
	} = useFieldArray({
		control,
		name: 'pictures',
	})

	const { errors } = useFormState({ control })

	const addDay = () => {
		daysAppend({})
		setDays([...days, { modal: false, cropper: '' }])
	}

	const removeDay = (index) => {
		daysRemove(index)
		setDays((prev) => prev.filter((_, i) => i !== index)) // Убираем из стейта объект по индексу
	}

	const nextStep = async (e) => {
		e.preventDefault()
		const result = await trigger(['days'], { shouldFocus: true })
		if (result) {
			setFormStep((prev) => prev + 1)
			document.documentElement.scrollTop = 0
		}
	}

	const handleTourImageCropp = () => {
		const img = cropperRef?.current
		const cropper = img?.cropper
		setTourImages({ modal: false, cropper: '' })
		picturesAppend(cropper.getCroppedCanvas().toDataURL())
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

	const prevStep = (e) => {
		e.preventDefault()
		setFormStep((prev) => prev - 1)
		document.documentElement.scrollTop = 0
	}

	const openDayImageModal = (index) => {
		const d = [...days] // create the copy of state array
		d[index] = { ...d[index], modal: true } //new value
		setDays(d)
	}

	const closeDayImageModal = (index) => {
		setImageError(null)
		const d = [...days] // create the copy of state array
		d[index] = { ...d[index], modal: false } //new value
		setDays(d)
	}

	const handleDaysImageCropp = (index) => {
		const img = cropperRef?.current
		const cropper = img?.cropper
		const d = [...days] // create the copy of state array
		d[index] = { modal: false, cropper: '' } //new value
		setDays(d)
		setValue(`days[${index}].image`, cropper.getCroppedCanvas().toDataURL())
	}

	const handleDayImageDrop = (dropped, index) => {
		const response = imageFilter(dropped[0])
		if (response.ok) {
			setImageError(null)
			const img = dropped[0]
			const reader = new FileReader()
			reader.onload = (event) => {
				const d = [...days] // create the copy of state array
				d[index] = { modal: true, cropper: event.target.result } //new value
				setDays(d)
			}
			reader.readAsDataURL(img)
		} else {
			setImageError(response.message)
		}
	}

	return (
		<div className={className} {...props}>
			<p className={styles.blockTitle}>Фотографии</p>
			<p>Добавьте до 10 изображений, показывающих основные впечатления тура.</p>
			<div className={styles.tourImages}>
				<>
					{picturesFields &&
						picturesFields.map((field, index) => (
							<div key={field.id} className={styles.tourImageItem}>
								<img src={CloseIcon} alt='' className={styles.tourImageCloseIcon} onClick={() => removeTourImage(index)} />
								<img src={value.pictures[index]} alt='' className={styles.tourImage} />
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
			<p className={styles.blockTitle}>Программа по дням</p>
			<p>Распишите подробную программу по дням, добавьте фотографии.</p>
			{daysFields.map((field, index) => (
				<div key={field.id} className={styles.dayItem}>
					<div className={styles.dayTitle}>
						<p className={styles.dayNumber}>{`${index + 1} день`}</p>
						{index > 0 && <img className={styles.closeIcon} src={CloseIcon} alt='' onClick={() => removeDay(index)} />}
					</div>
					<div className={styles.dayDescription}>
						<img className={styles.addPhoto} src={PhotoIcon} onClick={() => openDayImageModal(index)} alt='' />
						{value.days[index] && value.days[index].image && (
							<img className={styles.dayImage} src={value.days[index].image} alt='' />
						)}
						<Modal isOpen={days[index]?.modal} onRequestClose={() => closeDayImageModal(index)} className={styles.modal}>
							{days[index]?.cropper ? (
								<>
									<Cropper
										style={{ height: 400, width: 900 }}
										ref={cropperRef}
										// background={false}
										aspectRatio={15 / 9}
										rotatable={false}
										src={days[index].cropper}
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
							{...register(`days.${index}.dayDescription`, { required: 'Введите описание дня' })}
							filled={value?.days[index]?.dayDescription}
							error={errors.days && errors.days[index]?.dayDescription}
						/>
					</div>
				</div>
			))}
			{days.length < 30 ? (
				<div className={styles.addBlock} onClick={addDay}>
					<img src={PlusIcon} alt='' />
					<p>Добавить день</p>
				</div>
			) : null}

			<div className={styles.buttons}>
				<Button onClick={prevStep}>Предыдущий шаг</Button>
				<Button onClick={nextStep}>Следующий шаг</Button>
			</div>
		</div>
	)
}

export default ThirdStep

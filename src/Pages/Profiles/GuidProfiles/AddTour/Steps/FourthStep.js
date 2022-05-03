import React, { useRef, useState } from 'react'
import { Button, Input, TextArea } from '../../../../../Component'
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

const FourthStep = ({ className, control, register, formStep, setFormStep, trigger, ...props }) => {
	const {
		fields: includeFields,
		append: includeAppend,
		remove: includeRemove,
	} = useFieldArray({
		control,
		name: 'include',
	})
	const {
		fields: excludeFields,
		append: excludeAppend,
		remove: excludeRemove,
	} = useFieldArray({
		control,
		name: 'exclude',
	})
	const {
		fields: servisesFields,
		append: servisesAppend,
		remove: servisesRemove,
	} = useFieldArray({
		control,
		name: 'services',
	})

	const value = useWatch({
		control,
	})

	const { errors } = useFormState({ control })

	const [residentImage, setResidentImage] = useState({ modal: false, cropper: '', image: null })

	const [imageError, setImageError] = useState(null)

	const cropperRef = useRef()

	const handleResidentImageCropp = () => {
		const img = cropperRef?.current
		const cropper = img?.cropper
		setResidentImage({ modal: false, cropper: '', image: cropper.getCroppedCanvas().toDataURL() })
	}

	const handleResidentImageDrop = (dropped) => {
		const response = imageFilter(dropped[0])
		if (response.ok) {
			setImageError(null)
			const img = dropped[0]
			const reader = new FileReader()
			reader.onload = (event) => {
				// const d = [...days] // create the copy of state array
				// d[index] = { modal: false, image: event.target.result } //new value
				// setDays(d)
				setResidentImage({ ...residentImage, cropper: event.target.result })
			}
			reader.readAsDataURL(img)
		} else {
			setImageError(response.message)
		}
	}

	const addInclude = () => {
		includeAppend({})
	}
	const addExclude = () => {
		excludeAppend({})
	}
	const addServise = () => {
		servisesAppend({})
	}
	const nextStep = async (e) => {
		e.preventDefault()
		const result = await trigger(['residenceType', 'residenceDescription'], { shouldFocus: true })
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
			<p className={styles.blockTitle}>Проживание</p>
			<Input
				placeholder='Тип проживания'
				{...register('residenceType', { required: 'Введите тип проживания' })}
				filled={value.residenceType}
				error={errors.residenceType}
			/>
			<div className={styles.residence}>
				<img
					className={styles.addPhoto}
					src={PhotoIcon}
					alt=''
					onClick={() => setResidentImage({ ...residentImage, modal: true })}
				/>
				{residentImage.image && <img className={styles.residentImage} src={residentImage.image} alt='' />}
				<TextArea
					placeholder='Описание проживания'
					{...register('residenceDescription', { required: 'Введите описание проживания' })}
					filled={value.residenceDescription}
					error={errors.residenceDescription}
				/>
				<Modal
					isOpen={residentImage.modal}
					onRequestClose={() => setResidentImage({ ...residentImage, modal: false })}
					className={styles.modal}
				>
					{residentImage.cropper ? (
						<>
							<Cropper
								style={{ height: 400, width: '100%' }}
								ref={cropperRef}
								// background={false}
								aspectRatio={15 / 9}
								rotatable={false}
								src={residentImage.cropper}
								viewMode={2}
								zoom={0.7}
								// crop={onCrop}
							/>
							<Button onClick={handleResidentImageCropp}>Сохранить</Button>
						</>
					) : (
						<>
							{imageError && <p className={styles.error}>{imageError}</p>}
							<Dropzone onDropAccepted={handleResidentImageDrop}>
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
			</div>
			<p className={styles.blockTitle}>Сообщение для туристов</p>
			<p>Вы можете задать приветственное сообщение, которое будет присылаться всем туристам при покупке тура.</p>
			<TextArea placeholder='Сообщение' {...register('message')} filled={value.message} />
			<p className={styles.blockTitle}>Условия</p>
			<p>Распишите по пунктам, что включено в стоимость тура, а что нет.</p>
			{includeFields.map((field, index) => (
				<div key={field.id} className={styles.flex}>
					<Input
						placeholder='Входит в стоимость'
						{...register(`include.${index}.include`)}
						filled={value?.include[index]?.include}
					/>
					{index > 0 && <img className={styles.closeIcon} src={CloseIcon} alt='' onClick={() => includeRemove(index)} />}
				</div>
			))}
			<div className={styles.addBlock} onClick={() => addInclude()}>
				<img src={PlusIcon} alt='' />
				<p>Добавить</p>
			</div>
			{excludeFields.map((field, index) => (
				<div key={field.id} className={styles.flex}>
					<Input
						placeholder='Не входит в стоимость'
						{...register(`exclude.${index}.exclude`)}
						filled={value?.exclude[index]?.exclude}
					/>
					{index > 0 && <img className={styles.closeIcon} src={CloseIcon} alt='' onClick={() => excludeRemove(index)} />}
				</div>
			))}
			<div className={styles.addBlock} onClick={() => addExclude()}>
				<img src={PlusIcon} alt='' />
				<p>Добавить</p>
			</div>

			<p className={styles.blockTitle}>Дополнительные услуги</p>
			<p>Обозначьте дополнительные услуги, которые могут быть предоставлены клиентам, укажите их стоимость</p>
			{servisesFields.map((field, index) => (
				<div key={field.id} className={styles.servises}>
					<Input placeholder='Услуга' {...register(`services.${index}.service`)} filled={value?.services[index]?.service} />
					<Input
						placeholder='Стоимость'
						{...register(`services.${index}.servicePrice`)}
						filled={value?.services[index]?.servicePrice}
					/>
					{index > 0 && <img className={styles.closeIcon} src={CloseIcon} alt='' onClick={() => servisesRemove(index)} />}
				</div>
			))}

			<div className={styles.addBlock} onClick={addServise}>
				<img src={PlusIcon} alt='' />
				<p>Добавить услугу</p>
			</div>
			<div className={styles.buttons}>
				<Button onClick={prevStep}>Предыдущий шаг</Button>
				<Button onClick={nextStep}>Следующий шаг</Button>
			</div>
		</div>
	)
}

export default FourthStep

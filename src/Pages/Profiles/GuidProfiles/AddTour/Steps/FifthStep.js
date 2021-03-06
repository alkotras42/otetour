import React, { useState, useEffect, useRef } from 'react'
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

const FifthStep = ({
	className,
	control,
	register,
	trigger,
	formStep,
	setFormStep,
	setValue,
	activeLanguages,
	setActiveLanguages,
	...props
}) => {
	const [program, setProgram] = useState([{ modal: false, cropper: '' }])
	const {
		fields: esFields,
		append: esAppend,
		remove: esRemove,
	} = useFieldArray({
		control,
		name: 'es',
	})

	const esValue = useWatch({
		control,
		name: `es`,
	})

	const {
		fields: servisesFields,
		append: servisesAppend,
		remove: servisesRemove,
	} = useFieldArray({
		control,
		name: 'es.services',
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
		name: 'es.questions',
	})
	const addQuestion = () => {
		questionsAppend({})
	}

	const {
		fields: programFields,
		append: programAppend,
		remove: programRemove,
	} = useFieldArray({
		control,
		name: 'program',
	})

	const [imageError, setImageError] = useState(null)

	const cropperRef = useRef()

	const value = useWatch({
		control,
	})

	const { errors, isValid } = useFormState({ control })

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
		// ???????? ?????????????????? ???????????????? ???????? ?????????? ???????????????????????????? ?? ?????????????????????????? ???? ????????, ???????? ???????????? ??????, ???? ?????????????????? ???? ???????????? ????????
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
		const result = await trigger(['es'], { shouldFocus: true })
		if (result) {
			if (activeLanguages) {
				let count = 0
				// ???????? ???????? ???? ?????????????? ?????????????????????? ??????????????, ?????????? ?????????????????????????? ???? ???????????????? ?????????????????? ??????????
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
				{esFields.map((field, index) => (
					<div key={field.id} className={styles.lngBlock}>
						<p className={styles.languageTitle}>?????????????????? ????????</p>
						<Input
							placeholder='????????????????'
							{...register(`es.${index}.name`, { required: '?????????????? ???????????????? ????????' })}
							filled={esValue && esValue[index]?.name}
							error={errors.es && errors.es[index]?.name}
						/>
						<p className={styles.blockTitle}>???????????????? ????????</p>
						<p>?????????????? ??????????????, ???? ???????????????? ???????????????? ????????.</p>
						<TextArea
							placeholder='???????????????? ????????'
							{...register(`es.${index}.description`, { required: '?????????????? ???????????????? ????????' })}
							filled={esValue && esValue[index]?.description}
							error={errors.es && errors.es[index]?.description}
						/>
						<p className={styles.blockTitle}>???????????????????????????? ????????????????????</p>
						<p>
							???????????????????? ?? ??????, ?????????? ???????????????????? ?????????????????????????? ?? ???????????????? ?????? ?????????????? ?? ???????? ?? ?????????????????? ????????????. ????????????????????
							?????????????? ???????????? ??? ?????????? ?????????? ???????????????? ?? ?????????????? ?????? ???????????? ????????.
						</p>
						<TextArea
							placeholder='???????????????????? ?? ????????????????'
							{...register(`es.${index}.terms`, { required: '?????????????? ???????????????????? ?? ????????????????' })}
							filled={esValue && esValue[index]?.terms}
							error={errors.es && errors.es[index]?.terms}
						/>
						<TextArea
							placeholder='?????????????? ????????????'
							{...register(`es.${index}.cancellation`, { required: '?????????????? ?????????????? ????????????' })}
							filled={esValue && esValue[index]?.cancellation}
							error={errors.es && errors.es[index]?.cancellation}
						/>
						<p className={styles.blockTitle}>??????????????</p>
						<p>?????????????????? ???? ??????????????, ?????? ???????????????? ?? ?????????????????? ????????, ?? ?????? ??????.</p>
						<TextArea
							placeholder='???????????? ?? ??????????????????'
							{...register(`es.${index}.included`, { required: '?????????????? ?????? ???????????? ?? ??????????????????' })}
							filled={esValue && esValue[index]?.included}
							error={errors.es && errors.es[index]?.included}
						/>
						<TextArea
							placeholder='???? ???????????? ?? ??????????????????'
							{...register(`es.${index}.excluded`, { required: '?????????????? ?????? ???? ???????????? ?? ??????????????????' })}
							filled={esValue && esValue[index]?.excluded}
							error={errors.es && errors.es[index]?.excluded}
						/>
						<p className={styles.blockTitle}>????????????????????</p>
						<TextArea
							placeholder='???????????????? ????????????????????'
							{...register(`es.${index}.accommodation`, { required: '?????????????? ???????????????? ????????????????????' })}
							filled={esValue && esValue[index]?.accommodation}
							error={errors.es && errors.es[index]?.accommodation}
						/>
						<p className={styles.blockTitle}>?????????????????? ?????? ????????????????</p>
						<p>???? ???????????? ???????????? ???????????????????????????? ??????????????????, ?????????????? ?????????? ?????????????????????? ???????? ???????????????? ?????? ?????????????? ????????.</p>
						<TextArea
							placeholder='??????????????????'
							{...register(`es.${index}.message`, { required: '?????????????? ?????????????????? ?????? ????????????????' })}
							filled={esValue && esValue[index]?.message}
							error={errors.es && errors.es[index]?.message}
						/>
						{programFields.map((field, index) => (
							<div key={field.id} className={styles.dayItem}>
								<div className={styles.dayTitle}>
									<p className={styles.dayNumber}>{`${index + 1} ????????`}</p>
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
													??????????????????
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
																<p>???????????????????? ?????????????????????? ???????? ?????? ?????????????? ?????????? ??????????????.</p>
															</div>
														</div>
													)}
												</Dropzone>
											</>
										)}
									</Modal>

									<TextArea
										placeholder='???????????????? ??????'
										{...register(`es[0].program[${index}].dayProgram`, { required: '?????????????? ???????????????? ??????' })}
										filled={value.es && value.es[0].program?.length && value?.es[0].program[index]?.dayProgram}
										error={errors.es && errors.es[0]?.program && errors.es[0].program[index]?.dayProgram}
									/>
								</div>
							</div>
						))}
						<p className={styles.blockTitle}>???????????????????????????? ????????????</p>
						<p>???????????????????? ???????????????????????????? ????????????, ?????????????? ?????????? ???????? ?????????????????????????? ????????????????, ?????????????? ???? ??????????????????</p>
						{servisesFields.map((field, index) => (
							<div key={field.id} className={styles.servises}>
								<Input
									placeholder='????????????'
									{...register(`es[0].services.${index}.service`)}
									filled={value.es && value.es[0].servises?.length !== 0 && value?.es[0].services[index].service}
								/>
								<Input
									placeholder='??????????????????'
									{...register(`es[0].services.${index}.servicePrice`)}
									filled={value.es && value.es[0].servises?.length !== 0 && value?.es[0].services[index]?.servicePrice}
								/>
								{index > 0 && <img className={styles.closeIcon} src={CloseIcon} alt='' onClick={() => servisesRemove(index)} />}
							</div>
						))}
						<div className={styles.addBlock} onClick={addServise}>
							<img src={PlusIcon} alt='' />
							<p>???????????????? ????????????</p>
						</div>
						<p className={styles.blockTitle}>?????????? ???????????????????? ??????????????</p>
						<p>?????????????????? ??????????????, ?????????????? ?????????? ???????????????????? ?? ?????????????????????????? ???? ???????????? ????????.</p>
						{questionsFields.map((field, index) => (
							<div key={field.id} className={styles.question}>
								{index > 0 && (
									<img className={styles.closeIcon} src={CloseIcon} alt='' onClick={() => questionsRemove(index)} />
								)}
								<Input
									placeholder='????????????'
									{...register(`es[0].questions.${index}.question`)}
									filled={value.es && value.es[0].question?.length !== 0 && value.es[0].questions[index]?.question}
								/>
								<TextArea
									placeholder='??????????'
									{...register(`es[0].questions.${index}.answer`)}
									filled={value.es && value.es[0].question?.length !== 0 && value.es[0].questions[index]?.answer}
								/>
							</div>
						))}

						<div className={styles.addBlock} onClick={addQuestion}>
							<img src={PlusIcon} alt='' />
							<p>???????????????? ????????????</p>
						</div>
					</div>
				))}
			</div>

			{Object.values(activeLanguages)
				.slice(formStep - 1)
				.some((language) => language) ? (
				<div className={styles.buttons}>
					<Button onClick={prevStep}>???????????????????? ??????</Button>
					<Button onClick={nextStep}>?????????????????? ??????</Button>
				</div>
			) : (
				<>
					<div className={styles.buttons}>
						<Button onClick={prevStep}>???????????????????? ??????</Button>
						<Button color='white'>?????????????????? ?? ??????????????????</Button>
					</div>
					<Button type='submit' className={styles.submitButton}>
						?????????????????? ???? ??????????????????
					</Button>
				</>
			)}
		</div>
	)
}

export default FifthStep

import React, { useState } from 'react'
import { Input, TextArea } from '../../../../../Component'
import styles from '../AddTour.module.css'
import cn from 'classnames'
import PlusIcon from '../plusIcon.svg'
import PhotoIcon from '../photo.svg'
import { useFieldArray, useWatch } from 'react-hook-form'
import CloseIcon from '../closeIcon.svg'

const FourthStep = ({ className, control, register, ...props }) => {
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

	const addInclude = () => {
		includeAppend({})
	}
	const addExclude = () => {
		excludeAppend({})
	}
	const addServise = () => {
		servisesAppend({})
	}
	return (
		<div className={className} {...props}>
			<p className={styles.blockTitle}>Проживание</p>
			<Input placeholder='Тип проживания' name='residenceType' />
			<div className={styles.residence}>
				<img className={styles.addPhoto} src={PhotoIcon} alt='' />
				<TextArea placeholder='Описание проживания' name='residenceDescription' />
			</div>
			<p className={styles.blockTitle}>Сообщение для туристов</p>
			<p>Вы можете задать приветственное сообщение, которое будет присылаться всем туристам при покупке тура.</p>
			<TextArea placeholder='Сообщение' name='message' />
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
		</div>
	)
}

export default FourthStep

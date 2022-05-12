import React, { useEffect, useState } from 'react'
import { Button, Input, TextArea } from '../../../../../Component'
import styles from '../AddTour.module.css'
import cn from 'classnames'
import PlusIcon from '../plusIcon.svg'
import { useFieldArray, useFormState, useWatch } from 'react-hook-form'
import CloseIcon from '../closeIcon.svg'

const SecondStep = ({ className, control, register, formStep, setFormStep, trigger, ...props }) => {
	const {
		fields: languagesFields,
		append: languagesAppend,
		remove: languagesRemove,
	} = useFieldArray({
		control,
		name: 'languages',
	})

	const {
		fields: ruFields,
		append: ruAppend,
		remove: ruRemove,
	} = useFieldArray({
		control,
		name: 'ru',
	})

	const {
		fields: enFields,
		append: enAppend,
		remove: enRemove,
	} = useFieldArray({
		control,
		name: 'en',
	})

	const {
		fields: frFields,
		append: frAppend,
		remove: frRemove,
	} = useFieldArray({
		control,
		name: 'fr',
	})

	const {
		fields: esFields,
		append: esAppend,
		remove: esRemove,
	} = useFieldArray({
		control,
		name: 'es',
	})

	const {
		fields: itFields,
		append: itAppend,
		remove: itRemove,
	} = useFieldArray({
		control,
		name: 'it',
	})

	const {
		fields: deFields,
		append: deAppend,
		remove: deRemove,
	} = useFieldArray({
		control,
		name: 'de',
	})

	const ruValue = useWatch({
		control,
		name: `ru`,
	})

	const enValue = useWatch({
		control,
		name: `en`,
	})

	const frValue = useWatch({
		control,
		name: `fr`,
	})

	const esValue = useWatch({
		control,
		name: `es`,
	})

	const itValue = useWatch({
		control,
		name: `it`,
	})

	const deValue = useWatch({
		control,
		name: `de`,
	})

	const { errors } = useFormState({ control })

	const nextStep = async (e) => {
		e.preventDefault()
		const result = await trigger(['ru'], { shouldFocus: true })
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
			<p className={styles.blockTitle}>Языки</p>
			{languagesFields.map((field, index) => (
				<div key={field.id} className={styles.dateItem}>
					<div>
						{(!ruValue || !ruValue?.length > 0) && (
							<div className={styles.addBlock} onClick={() => ruAppend({})}>
								<img src={PlusIcon} alt='' />
								<p>Добавить русский язык</p>
							</div>
						)}
						{ruFields.map((field, index) => (
							<div key={field.id} className={styles.lngBlock}>
								<div className={styles.removeLngBlock}>
									<p>Удалить русский язык</p>
									<img className={styles.closeIcon} src={CloseIcon} alt='' onClick={() => ruRemove(index)} />
								</div>
								<Input
									placeholder='Название'
									{...register(`ru.${index}.name`, { required: 'Введите название тура' })}
									filled={ruValue && ruValue[index]?.name}
									error={errors.ru && errors.ru[index]?.name}
								/>
								<p className={styles.blockTitle}>Описание тура</p>
								<p>Задайте краткое, но понятное описание тура.</p>
								<TextArea
									placeholder='Описание тура'
									{...register(`ru.${index}.description`, { required: 'Введите описание тура' })}
									filled={ruValue && ruValue[index]?.description}
									error={errors.ru && errors.ru[index]?.description}
								/>
								<p className={styles.blockTitle}>Дополнительная информация</p>
								<p>
									Расскажите о том, какие требования предъявляются к туристам при участии в туре и посещении страны. Обозначьте
									условия отмены — какая сумма вернется к туристу при отмене тура.
								</p>
								<TextArea
									placeholder='Требования к туристам'
									{...register(`ru.${index}.terms`)}
									filled={ruValue && ruValue[index]?.terms}
								/>
								<TextArea
									placeholder='Условия отмены'
									{...register(`ru.${index}.cancellation`)}
									filled={ruValue && ruValue[index]?.cancellation}
								/>
								<p className={styles.blockTitle}>Условия</p>
								<p>Распишите по пунктам, что включено в стоимость тура, а что нет.</p>
								<TextArea
									placeholder='Входит в стоимость'
									{...register(`ru.${index}.included`)}
									filled={ruValue && ruValue[index]?.included}
								/>
								<TextArea
									placeholder='Не входит в стоимость'
									{...register(`ru.${index}.excluded`)}
									filled={ruValue && ruValue[index]?.excluded}
								/>
							</div>
						))}
					</div>
					<div>
						{(!enValue || !enValue?.length > 0) && (
							<div className={styles.addBlock} onClick={() => enAppend({})}>
								<img src={PlusIcon} alt='' />
								<p>Добавить английский язык</p>
							</div>
						)}
						{enFields.map((field, index) => (
							<div key={field.id} className={styles.lngBlock}>
								<div className={styles.removeLngBlock}>
									<p>Удалить английский язык</p>
									<img className={styles.closeIcon} src={CloseIcon} alt='' onClick={() => enRemove(index)} />
								</div>
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
									{...register(`en.${index}.terms`)}
									filled={enValue && enValue[index]?.terms}
								/>
								<TextArea
									placeholder='Условия отмены'
									{...register(`en.${index}.cancellation`)}
									filled={enValue && enValue[index]?.cancellation}
								/>
								<p className={styles.blockTitle}>Условия</p>
								<p>Распишите по пунктам, что включено в стоимость тура, а что нет.</p>
								<TextArea
									placeholder='Входит в стоимость'
									{...register(`en.${index}.included`)}
									filled={enValue && enValue[index]?.included}
								/>
								<TextArea
									placeholder='Не входит в стоимость'
									{...register(`en.${index}.excluded`)}
									filled={enValue && enValue[index]?.excluded}
								/>
							</div>
						))}
					</div>
					<div>
						{(!frValue || !frValue?.length > 0) && (
							<div className={styles.addBlock} onClick={() => frAppend({})}>
								<img src={PlusIcon} alt='' />
								<p>Добавить французский язык</p>
							</div>
						)}
						{frFields.map((field, index) => (
							<div key={field.id} className={styles.lngBlock}>
								<div className={styles.removeLngBlock}>
									<p>Удалить французский язык</p>
									<img className={styles.closeIcon} src={CloseIcon} alt='' onClick={() => frRemove(index)} />
								</div>
								<Input
									placeholder='Название'
									{...register(`fr.${index}.name`, { required: 'Введите название тура' })}
									filled={frValue && frValue[index]?.name}
									error={errors.fr && errors.fr[index]?.name}
								/>
								<p className={styles.blockTitle}>Описание тура</p>
								<p>Задайте краткое, но понятное описание тура.</p>
								<TextArea
									placeholder='Описание тура'
									{...register(`fr.${index}.description`, { required: 'Введите описание тура' })}
									filled={frValue && frValue[index]?.description}
									error={errors.fr && errors.fr[index]?.description}
								/>
								<p className={styles.blockTitle}>Дополнительная информация</p>
								<p>
									Расскажите о том, какие требования предъявляются к туристам при участии в туре и посещении страны. Обозначьте
									условия отмены — какая сумма вернется к туристу при отмене тура.
								</p>
								<TextArea
									placeholder='Требования к туристам'
									{...register(`fr.${index}.terms`)}
									filled={frValue && frValue[index]?.terms}
								/>
								<TextArea
									placeholder='Условия отмены'
									{...register(`fr.${index}.cancellation`)}
									filled={frValue && frValue[index]?.cancellation}
								/>
								<p className={styles.blockTitle}>Условия</p>
								<p>Распишите по пунктам, что включено в стоимость тура, а что нет.</p>
								<TextArea
									placeholder='Входит в стоимость'
									{...register(`fr.${index}.included`)}
									filled={frValue && frValue[index]?.included}
								/>
								<TextArea
									placeholder='Не входит в стоимость'
									{...register(`fr.${index}.excluded`)}
									filled={frValue && frValue[index]?.excluded}
								/>
							</div>
						))}
					</div>
					<div>
						{(!esValue || !esValue?.length > 0) && (
							<div className={styles.addBlock} onClick={() => esAppend({})}>
								<img src={PlusIcon} alt='' />
								<p>Добавить испанский язык</p>
							</div>
						)}
						{esFields.map((field, index) => (
							<div key={field.id} className={styles.lngBlock}>
								<div className={styles.removeLngBlock}>
									<p>Удалить испанский язык</p>
									<img className={styles.closeIcon} src={CloseIcon} alt='' onClick={() => esRemove(index)} />
								</div>
								<Input
									placeholder='Название'
									{...register(`es.${index}.name`, { required: 'Введите название тура' })}
									filled={esValue && esValue[index]?.name}
									error={errors.es && errors.es[index]?.name}
								/>
								<p className={styles.blockTitle}>Описание тура</p>
								<p>Задайте краткое, но понятное описание тура.</p>
								<TextArea
									placeholder='Описание тура'
									{...register(`es.${index}.description`, { required: 'Введите описание тура' })}
									filled={esValue && esValue[index]?.description}
									error={errors.es && errors.es[index]?.description}
								/>
								<p className={styles.blockTitle}>Дополнительная информация</p>
								<p>
									Расскажите о том, какие требования предъявляются к туристам при участии в туре и посещении страны. Обозначьте
									условия отмены — какая сумма вернется к туристу при отмене тура.
								</p>
								<TextArea
									placeholder='Требования к туристам'
									{...register(`es.${index}.terms`)}
									filled={esValue && esValue[index]?.terms}
								/>
								<TextArea
									placeholder='Условия отмены'
									{...register(`es.${index}.cancellation`)}
									filled={esValue && esValue[index]?.cancellation}
								/>
								<p className={styles.blockTitle}>Условия</p>
								<p>Распишите по пунктам, что включено в стоимость тура, а что нет.</p>
								<TextArea
									placeholder='Входит в стоимость'
									{...register(`es.${index}.included`)}
									filled={esValue && esValue[index]?.included}
								/>
								<TextArea
									placeholder='Не входит в стоимость'
									{...register(`es.${index}.excluded`)}
									filled={esValue && esValue[index]?.excluded}
								/>
							</div>
						))}
					</div>
					<div>
						{(!itValue || !itValue?.length > 0) && (
							<div className={styles.addBlock} onClick={() => itAppend({})}>
								<img src={PlusIcon} alt='' />
								<p>Добавить итальянский язык</p>
							</div>
						)}
						{itFields.map((field, index) => (
							<div key={field.id} className={styles.lngBlock}>
								<div className={styles.removeLngBlock}>
									<p>Удалить итальянский язык</p>
									<img className={styles.closeIcon} src={CloseIcon} alt='' onClick={() => itRemove(index)} />
								</div>
								<Input
									placeholder='Название'
									{...register(`it.${index}.name`, { required: 'Введите название тура' })}
									filled={itValue && itValue[index]?.name}
									error={errors.it && errors.it[index]?.name}
								/>
								<p className={styles.blockTitle}>Описание тура</p>
								<p>Задайте краткое, но понятное описание тура.</p>
								<TextArea
									placeholder='Описание тура'
									{...register(`it.${index}.description`, { required: 'Введите описание тура' })}
									filled={itValue && itValue[index]?.description}
									error={errors.it && errors.it[index]?.description}
								/>
								<p className={styles.blockTitle}>Дополнительная информация</p>
								<p>
									Расскажите о том, какие требования предъявляются к туристам при участии в туре и посещении страны. Обозначьте
									условия отмены — какая сумма вернется к туристу при отмене тура.
								</p>
								<TextArea
									placeholder='Требования к туристам'
									{...register(`it.${index}.terms`)}
									filled={itValue && itValue[index]?.terms}
								/>
								<TextArea
									placeholder='Условия отмены'
									{...register(`it.${index}.cancellation`)}
									filled={itValue && itValue[index]?.cancellation}
								/>
								<p className={styles.blockTitle}>Условия</p>
								<p>Распишите по пунктам, что включено в стоимость тура, а что нет.</p>
								<TextArea
									placeholder='Входит в стоимость'
									{...register(`it.${index}.included`)}
									filled={itValue && itValue[index]?.included}
								/>
								<TextArea
									placeholder='Не входит в стоимость'
									{...register(`it.${index}.excluded`)}
									filled={itValue && itValue[index]?.excluded}
								/>
							</div>
						))}
					</div>
					<div>
						{(!deValue || !deValue?.length > 0) && (
							<div className={styles.addBlock} onClick={() => deAppend({})}>
								<img src={PlusIcon} alt='' />
								<p>Добавить немецкий язык</p>
							</div>
						)}
						{deFields.map((field, index) => (
							<div key={field.id} className={styles.lngBlock}>
								<div className={styles.removeLngBlock}>
									<p>Удалить немецкий язык</p>
									<img className={styles.closeIcon} src={CloseIcon} alt='' onClick={() => deRemove(index)} />
								</div>
								<Input
									placeholder='Название'
									{...register(`de.${index}.name`, { required: 'Введите название тура' })}
									filled={deValue && deValue[index]?.name}
									error={errors.de && errors.de[index]?.name}
								/>
								<p className={styles.blockTitle}>Описание тура</p>
								<p>Задайте краткое, но понятное описание тура.</p>
								<TextArea
									placeholder='Описание тура'
									{...register(`de.${index}.description`, { required: 'Введите описание тура' })}
									filled={deValue && deValue[index]?.description}
									error={errors.de && errors.de[index]?.description}
								/>
								<p className={styles.blockTitle}>Дополнительная информация</p>
								<p>
									Расскажите о том, какие требования предъявляются к туристам при участии в туре и посещении страны. Обозначьте
									условия отмены — какая сумма вернется к туристу при отмене тура.
								</p>
								<TextArea
									placeholder='Требования к туристам'
									{...register(`de.${index}.terms`)}
									filled={deValue && deValue[index]?.terms}
								/>
								<TextArea
									placeholder='Условия отмены'
									{...register(`de.${index}.cancellation`)}
									filled={deValue && deValue[index]?.cancellation}
								/>
								<p className={styles.blockTitle}>Условия</p>
								<p>Распишите по пунктам, что включено в стоимость тура, а что нет.</p>
								<TextArea
									placeholder='Входит в стоимость'
									{...register(`de.${index}.included`)}
									filled={deValue && deValue[index]?.included}
								/>
								<TextArea
									placeholder='Не входит в стоимость'
									{...register(`de.${index}.excluded`)}
									filled={deValue && deValue[index]?.excluded}
								/>
							</div>
						))}
					</div>
				</div>
			))}
			<div className={styles.buttons}>
				<Button onClick={prevStep}>Предыдущий шаг</Button>
				<Button onClick={nextStep}>Следующий шаг</Button>
			</div>
		</div>
	)
}

export default SecondStep

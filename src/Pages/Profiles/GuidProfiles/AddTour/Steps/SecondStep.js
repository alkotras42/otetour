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
		const result = await trigger(['ru', 'en', 'fr', 'es', 'if', 'de'], { shouldFocus: true })
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
						{ruFields.map((field, index) => (
							<div key={field.id} className={styles.lngBlock}>
								<p className={styles.languageTitle}>Русский язык</p>
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
									{...register(`ru.${index}.terms`, { required: 'Укажите требования к туристам' })}
									filled={ruValue && ruValue[index]?.terms}
									error={errors.ru && errors.ru[index]?.terms}
								/>
								<TextArea
									placeholder='Условия отмены'
									{...register(`ru.${index}.cancellation`, { required: 'Укажите условия отмены' })}
									filled={ruValue && ruValue[index]?.cancellation}
									error={errors.ru && errors.ru[index]?.cancellation}
								/>
								<p className={styles.blockTitle}>Условия</p>
								<p>Распишите по пунктам, что включено в стоимость тура, а что нет.</p>
								<TextArea
									placeholder='Входит в стоимость'
									{...register(`ru.${index}.included`, { required: 'Укажите что входит в стоимость' })}
									filled={ruValue && ruValue[index]?.included}
									error={errors.ru && errors.ru[index]?.included}
								/>
								<TextArea
									placeholder='Не входит в стоимость'
									{...register(`ru.${index}.excluded`, { required: 'Укажите что не входит в стоимость' })}
									filled={ruValue && ruValue[index]?.excluded}
									error={errors.ru && errors.ru[index]?.excluded}
								/>
								<p className={styles.blockTitle}>Проживание</p>
								<TextArea
									placeholder='Описание проживания'
									{...register(`ru.${index}.accommodation`, { required: 'Введите описание проживания' })}
									filled={ruValue && ruValue[index]?.accommodation}
									error={errors.ru && errors.ru[index]?.accommodation}
								/>
								<p className={styles.blockTitle}>Сообщение для туристов</p>
								<p>Вы можете задать приветственное сообщение, которое будет присылаться всем туристам при покупке тура.</p>
								<TextArea
									placeholder='Сообщение'
									{...register(`ru.${index}.message`, { required: 'Введите сообщение для туристов' })}
									filled={ruValue && ruValue[index]?.message}
									error={errors.ru && errors.ru[index]?.message}
								/>
							</div>
						))}
					</div>
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
							</div>
						))}
					</div>
					<div>
						{frFields.map((field, index) => (
							<div key={field.id} className={styles.lngBlock}>
								<p className={styles.languageTitle}>Французский язык</p>
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
									{...register(`fr.${index}.terms`, { required: 'Укажите требования к туристам' })}
									filled={frValue && frValue[index]?.terms}
									error={errors.fr && errors.fr[index]?.terms}
								/>
								<TextArea
									placeholder='Условия отмены'
									{...register(`fr.${index}.cancellation`, { required: 'Укажите условия отмены' })}
									filled={frValue && frValue[index]?.cancellation}
									error={errors.fr && errors.fr[index]?.cancellation}
								/>
								<p className={styles.blockTitle}>Условия</p>
								<p>Распишите по пунктам, что включено в стоимость тура, а что нет.</p>
								<TextArea
									placeholder='Входит в стоимость'
									{...register(`fr.${index}.included`, { required: 'Укажите что входит в стоимость' })}
									filled={frValue && frValue[index]?.included}
									error={errors.fr && errors.fr[index]?.included}
								/>
								<TextArea
									placeholder='Не входит в стоимость'
									{...register(`fr.${index}.excluded`, { required: 'Укажите что не входит в стоимость' })}
									filled={frValue && frValue[index]?.excluded}
									error={errors.fr && errors.fr[index]?.excluded}
								/>
								<p className={styles.blockTitle}>Проживание</p>
								<TextArea
									placeholder='Описание проживания'
									{...register(`fr.${index}.accommodation`, { required: 'Введите описание проживания' })}
									filled={frValue && frValue[index]?.accommodation}
									error={errors.fr && errors.fr[index]?.accommodation}
								/>
								<p className={styles.blockTitle}>Сообщение для туристов</p>
								<p>Вы можете задать приветственное сообщение, которое будет присылаться всем туристам при покупке тура.</p>
								<TextArea
									placeholder='Сообщение'
									{...register(`fr.${index}.message`, { required: 'Введите сообщение для туристов' })}
									filled={frValue && frValue[index]?.message}
									error={errors.fr && errors.fr[index]?.message}
								/>
							</div>
						))}
					</div>
					<div>
						{esFields.map((field, index) => (
							<div key={field.id} className={styles.lngBlock}>
								<p className={styles.languageTitle}>Испанский язык</p>
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
									{...register(`es.${index}.terms`, { required: 'Укажите требования к туристам' })}
									filled={esValue && esValue[index]?.terms}
									error={errors.es && errors.es[index]?.terms}
								/>
								<TextArea
									placeholder='Условия отмены'
									{...register(`es.${index}.cancellation`, { required: 'Укажите условия отмены' })}
									filled={esValue && esValue[index]?.cancellation}
									error={errors.es && errors.es[index]?.cancellation}
								/>
								<p className={styles.blockTitle}>Условия</p>
								<p>Распишите по пунктам, что включено в стоимость тура, а что нет.</p>
								<TextArea
									placeholder='Входит в стоимость'
									{...register(`es.${index}.included`, { required: 'Укажите что входит в стоимость' })}
									filled={esValue && esValue[index]?.included}
									error={errors.es && errors.es[index]?.included}
								/>
								<TextArea
									placeholder='Не входит в стоимость'
									{...register(`es.${index}.excluded`, { required: 'Укажите что не входит в стоимость' })}
									filled={esValue && esValue[index]?.excluded}
									error={errors.es && errors.es[index]?.excluded}
								/>
								<p className={styles.blockTitle}>Проживание</p>
								<TextArea
									placeholder='Описание проживания'
									{...register(`es.${index}.accommodation`, { required: 'Введите описание проживания' })}
									filled={esValue && esValue[index]?.accommodation}
									error={errors.es && errors.es[index]?.accommodation}
								/>
								<p className={styles.blockTitle}>Сообщение для туристов</p>
								<p>Вы можете задать приветственное сообщение, которое будет присылаться всем туристам при покупке тура.</p>
								<TextArea
									placeholder='Сообщение'
									{...register(`es.${index}.message`, { required: 'Введите сообщение для туристов' })}
									filled={esValue && esValue[index]?.message}
									error={errors.es && errors.es[index]?.message}
								/>
							</div>
						))}
					</div>
					<div>
						{itFields.map((field, index) => (
							<div key={field.id} className={styles.lngBlock}>
								<p className={styles.languageTitle}>Итальянский язык</p>
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
									{...register(`it.${index}.terms`, { required: 'Укажите требования к туристам' })}
									filled={itValue && itValue[index]?.terms}
									error={errors.it && errors.it[index]?.terms}
								/>
								<TextArea
									placeholder='Условия отмены'
									{...register(`it.${index}.cancellation`, { required: 'Укажите условия отмены' })}
									filled={itValue && itValue[index]?.cancellation}
									error={errors.it && errors.it[index]?.cancellation}
								/>
								<p className={styles.blockTitle}>Условия</p>
								<p>Распишите по пунктам, что включено в стоимость тура, а что нет.</p>
								<TextArea
									placeholder='Входит в стоимость'
									{...register(`it.${index}.included`, { required: 'Укажите что входит в стоимость' })}
									filled={itValue && itValue[index]?.included}
									error={errors.it && errors.it[index]?.included}
								/>
								<TextArea
									placeholder='Не входит в стоимость'
									{...register(`it.${index}.excluded`, { required: 'Укажите что не входит в стоимость' })}
									filled={itValue && itValue[index]?.excluded}
									error={errors.it && errors.it[index]?.excluded}
								/>
								<p className={styles.blockTitle}>Проживание</p>
								<TextArea
									placeholder='Описание проживания'
									{...register(`it.${index}.accommodation`, { required: 'Введите описание проживания' })}
									filled={itValue && itValue[index]?.accommodation}
									error={errors.it && errors.it[index]?.accommodation}
								/>
								<p className={styles.blockTitle}>Сообщение для туристов</p>
								<p>Вы можете задать приветственное сообщение, которое будет присылаться всем туристам при покупке тура.</p>
								<TextArea
									placeholder='Сообщение'
									{...register(`it.${index}.message`, { required: 'Введите сообщение для туристов' })}
									filled={itValue && itValue[index]?.message}
									error={errors.it && errors.it[index]?.message}
								/>
							</div>
						))}
					</div>
					<div>
						{deFields.map((field, index) => (
							<div key={field.id} className={styles.lngBlock}>
								<p className={styles.languageTitle}>Немецкий язык</p>
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
									{...register(`de.${index}.terms`, { required: 'Укажите требования к туристам' })}
									filled={deValue && deValue[index]?.terms}
									error={errors.de && errors.de[index]?.terms}
								/>
								<TextArea
									placeholder='Условия отмены'
									{...register(`de.${index}.cancellation`, { required: 'Укажите условия отмены' })}
									filled={deValue && deValue[index]?.cancellation}
									error={errors.de && errors.de[index]?.cancellation}
								/>
								<p className={styles.blockTitle}>Условия</p>
								<p>Распишите по пунктам, что включено в стоимость тура, а что нет.</p>
								<TextArea
									placeholder='Входит в стоимость'
									{...register(`de.${index}.included`, { required: 'Укажите что входит в стоимость' })}
									filled={deValue && deValue[index]?.included}
									error={errors.de && errors.de[index]?.included}
								/>
								<TextArea
									placeholder='Не входит в стоимость'
									{...register(`de.${index}.excluded`, { required: 'Укажите что не входит в стоимость' })}
									filled={deValue && deValue[index]?.excluded}
									error={errors.de && errors.de[index]?.excluded}
								/>
								<p className={styles.blockTitle}>Проживание</p>
								<TextArea
									placeholder='Описание проживания'
									{...register(`de.${index}.accommodation`, { required: 'Введите описание проживания' })}
									filled={deValue && deValue[index]?.accommodation}
									error={errors.de && errors.de[index]?.accommodation}
								/>
								<p className={styles.blockTitle}>Сообщение для туристов</p>
								<p>Вы можете задать приветственное сообщение, которое будет присылаться всем туристам при покупке тура.</p>
								<TextArea
									placeholder='Сообщение'
									{...register(`de.${index}.message`, { required: 'Введите сообщение для туристов' })}
									filled={deValue && deValue[index]?.message}
									error={errors.de && errors.de[index]?.message}
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

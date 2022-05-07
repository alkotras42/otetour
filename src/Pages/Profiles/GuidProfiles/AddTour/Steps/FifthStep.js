import React, { useState } from 'react'
import { Button, Input, TextArea } from '../../../../../Component'
import styles from '../AddTour.module.css'
import cn from 'classnames'
import PlusIcon from '../plusIcon.svg'
import PhotoIcon from '../photo.svg'
import { useFieldArray, useWatch } from 'react-hook-form'
import CloseIcon from '../closeIcon.svg'

const FifthStep = ({ className, control, register, formStep, setFormStep, ...props }) => {
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'questions',
	})

	const value = useWatch({
		control,
	})

	const addQuestion = () => {
		append({})
	}

	const prevStep = (e) => {
		e.preventDefault()
		setFormStep((prev) => prev - 1)
		document.documentElement.scrollTop = 0
	}

	return (
		<div className={className} {...props}>

			<p className={styles.blockTitle}>Часто задаваемые вопросы</p>
			<p>Распишите вопросы, которые могут возникнуть у пользователей по поводу тура.</p>
			{fields.map((field, index) => (
				<div key={field.id} className={styles.question}>
					{index > 0 && <img className={styles.closeIcon} src={CloseIcon} alt='' onClick={() => remove(index)} />}
					<Input
						placeholder='Вопрос'
						{...register(`questions.${index}.question`)}
						filled={value.questions[index]?.question}
					/>
					<TextArea placeholder='Ответ' {...register(`questions.${index}.answer`)} filled={value.questions[index]?.answer} />
				</div>
			))}

			<div className={styles.addBlock} onClick={addQuestion}>
				<img src={PlusIcon} alt='' />
				<p>Добавить вопрос</p>
			</div>
			<div>
				<div className={styles.buttons}>
					<Button onClick={prevStep}>Предыдущий шаг</Button>
					<Button color='white'>Сохранить в черновики</Button>
				</div>
				<Button type="submit" className={styles.submitButton}>Отправить на модерацию</Button>
			</div>
		</div>
	)
}

export default FifthStep

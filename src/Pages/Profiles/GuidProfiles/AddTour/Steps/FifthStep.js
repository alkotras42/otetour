import React, { useState } from 'react'
import { Input, TextArea } from '../../../../../Component'
import styles from '../AddTour.module.css'
import cn from 'classnames'
import PlusIcon from '../plusIcon.svg'
import PhotoIcon from '../photo.svg'
import { useFieldArray, useWatch } from 'react-hook-form'
import CloseIcon from '../closeIcon.svg'

const FifthStep = ({ className, control, register, ...props }) => {
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

	return (
		<div className={className} {...props}>
			<p className={styles.blockTitle}>Дополнительная информация</p>
			<p>
				Расскажите о том, какие требования предъявляются к туристам при участии в туре и посещении страны. Обозначьте
				условия отмены — какая сумма вернется к туристу при отмене тура.
			</p>
			<TextArea
				placeholder='Требования к туристам'
				name='requirements'
				{...register('requirements')}
				filled={value.requirements}
			/>
			<TextArea
				placeholder='Условия отмены'
				name='cancelCondaction'
				{...register('cancelCondaction')}
				filled={value.cancelCondaction}
			/>
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
		</div>
	)
}

export default FifthStep

import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button, Difficulty, Input, Rating } from '../../../Component'
import { withLayout } from '../../../Layout/Layout'
import cn from 'classnames'
import styles from './AddTrip.module.css'
import ArrowIcon from './arrow.svg'
import { priceRu } from '../../../Helpers/helpers'
import { useForm, useFormState, useWatch } from 'react-hook-form'

const AddTrip = ({ ...props }) => {
	const { register, control, trigger, setValue, handleSubmit } = useForm({
		mode: 'all',
	})

	const value = useWatch({
		control,
	})

	const { errors } = useFormState({ control })

	const onSubmit = (data) => {
		console.log(data)
	}

	return (
		<div className={styles.addTrip} {...props}>
			<div className={styles.addTripWrapper}>
				<p className={styles.title}>Добавить поездку</p>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.twoInputs}>
						<Input
							placeholder='С'
							{...register(`dateFrom`, { required: 'Введите дату начала поездки' })}
							filled={value.dateFrom}
							error={errors.dateFrom}
						/>
						<Input
							placeholder='До'
							{...register(`dateTo`, { required: 'Введите дату конца поездки' })}
							filled={value.dateTo}
							error={errors.dateTo}
						/>
					</div>
					<div className={styles.places}>
						<span>Осталось мест</span>
						<Input
							placeholder='Количество мест'
							name='placesRemain'
							{...register(`placesRemain`, {
								pattern: { value: /^[0-9]+$/, message: 'Значение должно быть числом' },
							})}
							filled={value.placesRemain}
							error={errors.placesRemain}
						/>
						<span>из</span>
						<Input
							placeholder='Всего мест'
							name='placesTotal'
							{...register(`placesTotal`, {
								required: 'Введите полное число мест',
								pattern: { value: /^[0-9]+$/, message: 'Значение должно быть числом' },
							})}
							filled={value.placesTotal}
							error={errors.placesTotal}
						/>
					</div>
					<Input
						placeholder='Язык группы'
						{...register('groupLanguage', { required: 'Введите язык группы' })}
						filled={value.groupLanguage}
						error={errors.groupLanguage}
					/>
					<Input
						placeholder='Стоимость тура'
						name='price'
						{...register(`price`, {
							required: 'Введите стоимость тура',
							pattern: { value: /^[0-9]+$/, message: 'Значение должно быть числом' },
						})}
						filled={value.price}
						error={errors.price}
					/>
					<p>
						*Комиссия за использование платформы составит <span className={styles.redSpan}>1 250 ₽</span> за каждого туриста,
						купившего этот тур.
					</p>
					<div className={styles.twoInputs}>
						<Input
							placeholder='Предоплата'
							name='prepay'
							{...register(`prepay`, {
								pattern: { value: /^[0-9]+$/, message: 'Значение должно быть числом' },
							})}
							filled={value.prepay}
							error={errors.prepay}
						/>
						<Input
							disabled={!+value.prepay}
							placeholder='Дата предоплаты'
							name='prepayday'
							{...register(`prepayday`)}
							filled={value.prepayday}
							error={errors.prepayday}
						/>
					</div>
					<Input
						placeholder='Дата постоплаты'
						name='payday'
						{...register(`payday`)}
						filled={value.payday}
						error={errors.payday}
					/>
					<Input
						placeholder='Скидка'
						name='sale'
						{...register(`sale`, {
							pattern: {
								value: /^[0-9]+$/,
								message: 'Значение должно быть числом',
							},
						})}
						filled={value.sale}
						error={errors.sale}
					/>
					<div>
						<Button type='submit' className={styles.submitButton}>
							Сохранить поездку
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default withLayout(AddTrip)

import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button, Difficulty, Input, Rating } from '../../../../Component'
import { withLayout } from '../../../../Layout/Layout'
import cn from 'classnames'
import styles from './AddTrip.module.css'
import ArrowIcon from './arrow.svg'
import { priceRu } from '../../../../Helpers/helpers'
import { useForm, useFormState, useWatch } from 'react-hook-form'
import { createTrip, getTripById, updateTrip } from '../../../../Api/Trips'
import { UserContext } from '../../../../Context/user.context'
import { ClipLoader } from 'react-spinners'

const AddTrip = ({ ...props }) => {
	const [defaultValue, setDefaultValue] = useState(null)
	const { register, control, trigger, setValue, reset, handleSubmit } = useForm({
		defaultValue: defaultValue,
		mode: 'all',
	})

	const [submiting, setSubmiting] = useState({ loading: false, error: '', success: '' })

	const { user, setUser } = useContext(UserContext)

	const params = useParams()
	const isAddMode = !params.tripId

	const value = useWatch({
		control,
	})

	useEffect(() => {
		if (!isAddMode) {
			if (user) {
				;(async () => {
					reset(await getTripById(params.id, params.tripId, user.token))
				})()
			}
		}
	}, [user])

	const { errors } = useFormState({ control })

	const onSubmit = async (data) => {
		if (isAddMode) {
			setSubmiting({ ...submiting, loading: true })
			try {
				await createTrip(data, params.id, user.token)
				setSubmiting({ ...submiting, loading: false, success: 'Поездка успешно добавлена' })
			} catch (e) {
				setSubmiting({ ...submiting, loading: false, error: e.message })
			}
		} else {
			setSubmiting({ ...submiting, loading: true })
			try {
				await updateTrip(data, params.id, params.tripId, user.token)
				setSubmiting({ ...submiting, loading: false, success: 'Поездка успешно обновлена' })
			} catch (e) {
				setSubmiting({ ...submiting, loading: false, error: e.message })
			}
		}
	}

	return (
		<div className={styles.addTrip} {...props}>
			<div className={styles.addTripWrapper}>
				<p className={styles.title}>Добавить поездку</p>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<Input
						placeholder='С'
						{...register(`date_start`, {
							required: 'Введите дату начала поездки',
							pattern: {
								value: /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/,
								message: 'Введите дату в формате ГГГГ-ММ-ДД',
							},
						})}
						filled={value.date_start}
						error={errors.date_start}
					/>
					{/* <Input
							placeholder='До'
							{...register(`dateTo`, { required: 'Введите дату конца поездки' })}
							filled={value.dateTo}
							error={errors.dateTo}
						/> */}

					<div className={styles.places}>
						<span>Осталось мест</span>
						<Input
							placeholder='Количество мест'
							{...register(`places_left`, {
								pattern: { value: /^[0-9]+$/, message: 'Значение должно быть числом' },
								validate: (v) => v <= value.places_total || 'Количество оставшихся мест не может превышать полное число мест',
							})}
							filled={value.places_left}
							error={errors.places_left}
						/>
						<span>из</span>
						<Input
							placeholder='Всего мест'
							{...register(`places_total`, {
								required: 'Введите полное число мест',
								pattern: { value: /^[0-9]+$/, message: 'Значение должно быть числом' },
								onChange: (e) => trigger('places_left')
							})}
							filled={value.places_total}
							error={errors.places_total}
						/>
					</div>
					<Input
						placeholder='Язык группы'
						{...register('language', { required: 'Введите язык группы' })}
						filled={value.language}
						error={errors.language}
					/>
					<Input
						placeholder='Стоимость тура'
						{...register(`sum_price`, {
							required: 'Введите стоимость тура',
							pattern: { value: /[+-]?([0-9]*[.])?[0-9]+/, message: 'Значение должно быть числом' },
						})}
						filled={value.sum_price}
						error={errors.sum_price}
					/>
					<p>
						*Комиссия за использование платформы составит <span className={styles.redSpan}>1 250 ₽</span> за каждого туриста,
						купившего этот тур.
					</p>
					<div className={styles.twoInputs}>
						<Input
							placeholder='Предоплата'
							{...register(`sum_prepayment`, {
								pattern: { value: /[+-]?([0-9]*[.])?[0-9]+/, message: 'Значение должно быть числом' },
							})}
							filled={value.sum_prepayment}
							error={errors.sum_prepayment}
						/>
						<Input
							disabled={!+value.sum_prepayment}
							placeholder='Дата предоплаты'
							{...register(`prepayday`)}
							filled={value.prepayday}
							error={errors.prepayday}
						/>
					</div>
					{/* <Input placeholder='Дата постоплаты' {...register(`payday`)} filled={value.payday} error={errors.payday} /> */}
					<Input
						placeholder='Цена со скидкой'
						{...register(`sum_price_discount`, {
							pattern: {
								value: /[+-]?([0-9]*[.])?[0-9]+/,
								message: 'Значение должно быть числом',
							},
						})}
						filled={value.sum_price_discount}
						error={errors.sum_price_discount}
					/>
					<div>
						<Button type='submit' className={styles.submitButton}>
							{submiting.loading ? <ClipLoader color='#fff' /> : 'Сохранить поездку'}
						</Button>
						{submiting.error && <p className={styles.error}>{submiting.error}</p>}
						{submiting.success && <p className={styles.success}>{submiting.success}</p>}
					</div>
				</form>
			</div>
		</div>
	)
}

export default withLayout(AddTrip)

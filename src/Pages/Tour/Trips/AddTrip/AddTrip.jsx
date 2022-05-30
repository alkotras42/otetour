import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button, DatePikerInput, Difficulty, Input, InputWithMask, Rating } from '../../../../Component'
import { withLayout } from '../../../../Layout/Layout'
import cn from 'classnames'
import styles from './AddTrip.module.css'
import { useForm, useFormState, useWatch, Controller } from 'react-hook-form'
import { createTrip, getTripById, updateTrip } from '../../../../Api/Trips'
import { UserContext } from '../../../../Context/user.context'
import { ClipLoader } from 'react-spinners'
import { hashids } from '../../../../Helpers/helpers'

const AddTrip = ({ ...props }) => {
	const [defaultValue, setDefaultValue] = useState(null)
	const { register, control, setError, clearErrors, reset, handleSubmit } = useForm({
		defaultValue: defaultValue,
		mode: 'onChange',
	})

	const [submiting, setSubmiting] = useState({ loading: false, error: '', success: '' })

	const { user, setUser } = useContext(UserContext)

	const params = useParams()
	const navigate = useNavigate()
	const isAddMode = !params.tripId

	const value = useWatch({
		control,
	})

	useEffect(() => {
		if (!isAddMode) {
			if (user) {
				;(async () => {
					const res = await getTripById(params.id, params.tripId, user.token)
					if (res) {
						reset(res)
					} else {
						navigate('/404')
					}
				})()
			}
		}
	}, [user])

	const { errors } = useFormState({ control })

	const onSubmit = async (data) => {
		if (isAddMode) {
			setSubmiting({ ...submiting, loading: true })
			try {
				const res = await createTrip(data, params.id, user.token)
				if (res.code == 200) {
					setSubmiting({ ...submiting, loading: false, success: 'Поездка успешно добавлена' })
				} else {
					setSubmiting({ ...submiting, loading: false, error: res.error })
				}
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

	useEffect(() => {
		if (value.places_total && value.places_left && +value.places_total < +value.places_left) {
			setError('places_left', {
				type: 'custom',
				message: 'Количество оставшихся мест не должно превышать полное число мест',
			})
		} else {
			clearErrors('places_left')
		}
	}, [value.places_total, value.places_left])

	return (
		<div className={styles.addTrip} {...props}>
			<div className={styles.addTripWrapper}>
				<div className={styles.breadcrumbs}>
					<Link to='/'>Главная</Link> / <Link to={'/guide/tours/' + hashids.encode(user?.profile.id)}>Мои туры</Link> /{' '}
					<Link to={'/tour/' + params.id + '/trips'}>Даты</Link> / Добавить дату
				</div>
				<p className={styles.title}>Добавить дату</p>

				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<Controller
						control={control}
						name='date_start'
						render={({ field }) => (
							<DatePikerInput
								placeholderText='Дата начала'
								readOnly={true}
								onChange={(date) => field.onChange(date)}
								selected={field.value}
								error={errors.date_start}
							/>
						)}
						rules={{
							required: 'Введите дату начала поездки',
							pattern: {
								value: /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/,
								message: 'Введите дату в формате ГГГГ-ММ-ДД',
							},
						}}
					/>

					<div className={styles.places}>
						<span>Осталось мест</span>
						<Input
							placeholder='Количество мест'
							{...register(`places_left`, {
								required: 'Введите количество свободных мест',
								pattern: { value: /^[0-9]+$/, message: 'Значение должно быть числом' },
								max: { value: value.places_total, message: 'Количество оставшихся мест не должно превышать полное число мест' },
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
					<Controller
						control={control}
						name='sum_price'
						render={({ field }) => (
							<InputWithMask
								placeholder='Стоимость тура'
								onValueChange={(v) => field.onChange(v.value)}
								thousandSeparator={' '}
								suffix={' ₽'}
								filled={value.sum_price}
								error={errors.sum_price}
							/>
						)}
						rules={{
							required: 'Введите стоимость тура',
						}}
					/>

					<p>
						*Комиссия за использование платформы составит <span className={styles.redSpan}>1 250 ₽</span> за каждого туриста,
						купившего этот тур.
					</p>
					<div className={styles.twoInputs}>
						<Controller
							control={control}
							name='sum_prepayment'
							render={({ field }) => (
								<InputWithMask
									placeholder='Предоплата'
									onValueChange={(v) => field.onChange(v.value)}
									thousandSeparator={' '}
									suffix={' ₽'}
									filled={value.sum_prepayment}
									error={errors.sum_prepayment}
								/>
							)}
							rules={{
								max: {
									value: value.sum_price,
									message: 'Размер предоплаты не может превышать полную цену',
								},
							}}
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
					<Controller
						control={control}
						name='sum_price_discount'
						render={({ field }) => (
							<InputWithMask
								placeholder='Цена со скидкой'
								onValueChange={(v) => field.onChange(v.value)}
								thousandSeparator={' '}
								suffix={' ₽'}
								filled={value.sum_price_discount}
								error={errors.sum_price_discount}
							/>
						)}
						rules={{
							max: {
								value: value.sum_price,
								message: 'Цена со скидкой не может превышать цену без скидки',
							},
						}}
					/>

					<div>
						<Button type='submit' className={styles.submitButton}>
							{submiting.loading ? <ClipLoader color='#fff' /> : 'Сохранить дату'}
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

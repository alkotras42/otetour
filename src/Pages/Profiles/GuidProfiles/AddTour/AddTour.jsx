import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { withLayout } from '../../../../Layout/Layout'
import styles from './AddTour.module.css'
import cn from 'classnames'
import { Button, Input, Loading } from '../../../../Component'
import { hashids, PersonalInfoSchema, PersonalPasswordSchema, priceRu } from '../../../../Helpers/helpers'
import { UserContext } from '../../../../Context/user.context'
import PlusIcon from './plusIcon.svg'
import CloseIcon from './closeIcon.svg'
import FirstStep from './Steps/FirstStep'
import SecondStep from './Steps/SecondStep'
import ThirdStep from './Steps/ThirdStep'
import FourthStep from './Steps/FourthStep'
import FifthStep from './Steps/FifthStep'
import { useForm, useWatch } from 'react-hook-form'
import { createTour, getTourById, updateTour } from '../../../../Api/Tour'

const AddTour = () => {
	const [defaultValues, setDefaultValues] = useState({
		program: [{}],
		services: [{}],
		questions: [{}],
		languages: [{}],
	})

	const [submiting, setSubmiting] = useState({ loading: false, error: '', success: '' })
	const [tourLoading, setTourLoading] = useState(false)

	const [formStep, setFormStep] = useState(1)
	const { user, setUser } = useContext(UserContext)

	const [userData, setUserData] = useState({ id: 1 })

	const { register, control, watch, trigger, reset, setValue, getValues, handleSubmit } = useForm({
		defaultValues,
		mode: 'onChange',
	})

	const params = useParams()
	const isAddMode = !params.tourId

	useEffect(() => {
		if (user) {
			setUserData({ id: user.profile.id })
			if (!isAddMode) {
				;(async () => {
					setTourLoading(true)
					let tourData = await getTourById(params.tourId, user.token)
					tourData = {
						...tourData,
						languages: [{}],
						ru: tourData.descriptions.RU?.is_active == 1 ? [tourData.descriptions.RU] : undefined,
						en: tourData.descriptions.EN?.is_active == 1 ? [tourData.descriptions.EN] : undefined,
						es: tourData.descriptions.ES?.is_active == 1 ? [tourData.descriptions.ES] : undefined,
						FR: tourData.descriptions.FR?.is_active == 1 ? [tourData.descriptions.FR] : undefined,
						IT: tourData.descriptions.IT?.is_active == 1 ? [tourData.descriptions.IT] : undefined,
						de: tourData.descriptions.DE?.is_active == 1 ? [tourData.descriptions.DE] : undefined,
					}
					reset(tourData)
					setTourLoading(false)
				})()
			}
		}
	}, [user])

	const onSubmit = async (data) => {
		if (isAddMode) {
			setSubmiting({ ...submiting, loading: true })
			try {
				const res = await createTour(data, user.token)
				setSubmiting({ ...submiting, loading: false, success: 'Тур успешно отправлен на модерацию!' })
				reset({ defaultValues })
			} catch (e) {
				setSubmiting({ ...submiting, loading: false, error: e.message })
			}
		} else {
			setSubmiting({ ...submiting, loading: true })
			try {
				const res = await updateTour(data, params.tourId, user.token)
				setSubmiting({ ...submiting, loading: false, success: 'Тур успешно отредактирован!' })
			} catch (e) {
				setSubmiting({ ...submiting, loading: false, error: e.message })
			}
		}
	}

	return (
		<div className={styles.tourPay}>
			<div className={styles.tourPayWrapper}>
				<div className={styles.breadcrumbs}>
					<Link to='/'>Главная</Link> / <Link to={'/guide/tours/' + hashids.encode(userData.id)}>Мои туры</Link> / Добавить
					тур
				</div>
				<p className={styles.title}>{isAddMode ? 'Добавить тур' : 'Редактировать тур'} </p>
				{/* {!isAddMode && !getValues()['category_id'] && <Loading/>} */}
				{tourLoading ? (
					<Loading />
				) : (
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className={styles.forms}>
							<FirstStep
								trigger={trigger}
								formStep={formStep}
								setFormStep={setFormStep}
								control={control}
								register={register}
								className={cn({
									[styles.hide]: formStep != 1,
								})}
							/>
							<SecondStep
								trigger={trigger}
								formStep={formStep}
								setFormStep={setFormStep}
								control={control}
								register={register}
								className={cn({
									[styles.hide]: formStep != 2,
								})}
							/>
							<ThirdStep
								setValue={setValue}
								trigger={trigger}
								formStep={formStep}
								setFormStep={setFormStep}
								control={control}
								register={register}
								className={cn({
									[styles.hide]: formStep != 3,
								})}
							/>
							<FourthStep
								trigger={trigger}
								formStep={formStep}
								setFormStep={setFormStep}
								control={control}
								register={register}
								className={cn({
									[styles.hide]: formStep != 4,
								})}
							/>
							<FifthStep
								formStep={formStep}
								setFormStep={setFormStep}
								control={control}
								register={register}
								className={cn({
									[styles.hide]: formStep != 5,
								})}
							/>
						</div>
					</form>
				)}

				{submiting.loading && <Loading />}
				{submiting.error && <p className={styles.error}>{submiting.error}</p>}
				{submiting.success && <p className={styles.success}>{submiting.success}</p>}
			</div>
		</div>
	)
}

export default withLayout(AddTour)

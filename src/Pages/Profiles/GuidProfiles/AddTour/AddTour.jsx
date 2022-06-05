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
import SixthStep from './Steps/SixthStep'
import SeventhStep from './Steps/SeventhStep'

const AddTour = () => {
	const [defaultValues, setDefaultValues] = useState({
		program: [{}],
		languages: [{}],
	})

	const [activeLanguages, setActiveLanguages] = useState({
		ru: false,
		en: false,
		fr: false,
		es: false,
		it: false,
		de: false,
	})

	const [submiting, setSubmiting] = useState({ loading: false, error: '', success: '' })
	const [tourLoading, setTourLoading] = useState(false)

	const [formStep, setFormStep] = useState(1)
	const { user, setUser } = useContext(UserContext)

	const [userData, setUserData] = useState({ id: 1 })

	const { register, control, watch, trigger, reset, setValue, getValues, setError, clearErrors, handleSubmit } = useForm(
		{
			defaultValues,
			mode: 'onChange',
		}
	)

	const value = useWatch({
		control,
	})

	useEffect(() => {
		if (value.length_days && value.length_days > 0 && value.length_days <= 30) {
			// setProgram(Array(+value.length_days).fill({ modal: false, cropper: '' }))
			// value.program.length = value.length_days
			// console.log(value.program)
			if (!value.program) {
				setValue('program', [{}])
			} else if (!value.program.length) {
				setValue('program', [{}])
			} else if (value.program.length < value.length_days) {
				setValue('program', [...value.program, ...Array(Math.max(value.length_days - value.program.length, 0)).fill({})])
			} else if (value.program.length > value.length_days) {
				setValue('program', value.program?.slice(0, value.length_days))
			}
		}
	}, [value.length_days])

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
		const result = await trigger()

		if (result) {
			if (isAddMode) {
				setSubmiting({ ...submiting, loading: true })
				try {
					const res = await createTour(data, user.token)
					setSubmiting({ ...submiting, loading: false, success: 'Тур успешно отправлен на модерацию!' })
					// reset()
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
								activeLanguages={activeLanguages}
								setActiveLanguages={setActiveLanguages}
								setValue={setValue}
								trigger={trigger}
								formStep={formStep}
								setFormStep={setFormStep}
								control={control}
								register={register}
								setError={setError}
								clearErrors={clearErrors}
								className={cn({
									[styles.hide]: formStep != 1,
								})}
							/>
							<SecondStep
								activeLanguages={activeLanguages}
								setActiveLanguages={setActiveLanguages}
								setValue={setValue}
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
								activeLanguages={activeLanguages}
								setActiveLanguages={setActiveLanguages}
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
								activeLanguages={activeLanguages}
								setActiveLanguages={setActiveLanguages}
								setValue={setValue}
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
								activeLanguages={activeLanguages}
								setActiveLanguages={setActiveLanguages}
								setValue={setValue}
								trigger={trigger}
								formStep={formStep}
								setFormStep={setFormStep}
								control={control}
								register={register}
								className={cn({
									[styles.hide]: formStep != 5,
								})}
							/>
							<SixthStep
								activeLanguages={activeLanguages}
								setActiveLanguages={setActiveLanguages}
								setValue={setValue}
								trigger={trigger}
								formStep={formStep}
								setFormStep={setFormStep}
								control={control}
								register={register}
								className={cn({
									[styles.hide]: formStep != 6,
								})}
							/>
							<SeventhStep
								activeLanguages={activeLanguages}
								setActiveLanguages={setActiveLanguages}
								setValue={setValue}
								trigger={trigger}
								formStep={formStep}
								setFormStep={setFormStep}
								control={control}
								register={register}
								className={cn({
									[styles.hide]: formStep != 7,
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

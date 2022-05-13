import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
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
import { createTour } from '../../../../Api/Tour'

const AddTour = () => {
	const [defaultValues, setDefaultValues] = useState({
		days: [{}],
		services: [{}],
		questions: [{}],
		languages: [{}],
	})

	const [submiting, setSubmiting] = useState({ loading: false, error: '', success: '' })

	const [formStep, setFormStep] = useState(1)
	const { user, setUser } = useContext(UserContext)

	const [userData, setUserData] = useState({ id: 1 })

	const { register, control, watch, trigger, reset, setValue, handleSubmit } = useForm({
		defaultValues,
		mode: 'onChange',
	})

	useEffect(() => {
		if (user) {
			setUserData({ id: user.profile.id })
		}
	}, [user])

	const onSubmit = async (data) => {
		setSubmiting({ ...submiting, loading: true })
		try {
			const res = await createTour(data, user.token)
			setSubmiting({ ...submiting, loading: false, success: 'Тур успешно отправлен на модерацию!' })
			reset({ defaultValues })
		} catch (e) {
			setSubmiting({ ...submiting, loading: false, error: e.message })
		}
	}

	return (
		<div className={styles.tourPay}>
			<div className={styles.tourPayWrapper}>
				<div className={styles.breadcrumbs}>
					<Link to='/'>Главная</Link> / <Link to={'/user/tours/' + hashids.encode(userData.id)}>Мои туры</Link> / Добавить
					тур
				</div>
				<p className={styles.title}>Добавить тур</p>
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
				{submiting.loading && <Loading />}
				{submiting.error && <p className={styles.error}>{submiting.error}</p>}
				{submiting.success && <p className={styles.success}>{submiting.success}</p>}
			</div>
		</div>
	)
}

export default withLayout(AddTour)

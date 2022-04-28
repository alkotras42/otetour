import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { withLayout } from '../../../../Layout/Layout'
import styles from './AddTour.module.css'
import cn from 'classnames'
import { Button, Input } from '../../../../Component'
import { hashids, PersonalInfoSchema, PersonalPasswordSchema, priceRu } from '../../../../Helpers/helpers'
import { UserContext } from '../../../../Context/user.context'
import PlusIcon from './plusIcon.svg'
import CloseIcon from './closeIcon.svg'
import FirstStep from './Steps/FirstStep'
import SecondStep from './Steps/SecondStep'
import ThirdStep from './Steps/ThirdStep'
import FourthStep from './Steps/FourthStep'
import FifthStep from './Steps/FifthStep'
import { useForm } from 'react-hook-form'

const AddTour = () => {
	const defaultValues = {
		dates: [{}],
		days: [{}],
		include: [{}],
		exclude: [{}],
		services: [{}],
		questions: [{}],
	}

	const [formStep, setFormStep] = useState(1)
	const { user, setUser } = useContext(UserContext)

	const [userData, setUserData] = useState({ id: 1 })

	const { register, control, watch, trigger, setValue, handleSubmit } = useForm({
		defaultValues: defaultValues,
		mode: 'all',
	})

	useEffect(() => {
		if (user) {
			setUserData({ id: user.profile.id })
		}
	}, [user])

	const onSubmit = (data) => {
		console.log(data)
	}

	const [loading, setLoading] = useState(false)

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
			</div>
		</div>
	)
}

export default withLayout(AddTour)

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

	console.log(defaultValues.dates)
	const [formStep, setFormStep] = useState(1)
	const { user, setUser } = useContext(UserContext)

	const [value, setValue] = useState({ id: 1 })

	const { register, control, watch } = useForm({ defaultValues: defaultValues })

	useEffect(() => {
		if (user) {
			setValue({ id: user.profile.id })
		}
	}, [user])

	const nextStep = () => {
		setFormStep((prev) => prev + 1)
		document.documentElement.scrollTop = 0
	}

	const prevStep = () => {
		setFormStep((prev) => prev - 1)
		document.documentElement.scrollTop = 0
	}

	const [loading, setLoading] = useState(false)

	return (
		<div className={styles.tourPay}>
			<div className={styles.tourPayWrapper}>
				<div className={styles.breadcrumbs}>
					<Link to='/'>Главная</Link> / <Link to={'/user/tours/' + hashids.encode(value.id)}>Мои туры</Link> / Добавить тур
				</div>
				<p className={styles.title}>Добавить тур</p>
				<form>
					<div className={styles.forms}>
						<FirstStep
							control={control}
							register={register}
							className={cn({
								[styles.hide]: formStep != 1,
							})}
						/>
						<SecondStep
							control={control}
							register={register}
							className={cn({
								[styles.hide]: formStep != 2,
							})}
						/>
						<ThirdStep
							control={control}
							register={register}
							className={cn({
								[styles.hide]: formStep != 3,
							})}
						/>
						<FourthStep
							control={control}
							register={register}
							className={cn({
								[styles.hide]: formStep != 4,
							})}
						/>
						<FifthStep
							control={control}
							register={register}
							className={cn({
								[styles.hide]: formStep != 5,
							})}
						/>
					</div>
				</form>
				<div>
					{formStep == 5 ? (
						<div>
							<div className={styles.buttons}>
								<Button disabled={formStep == 1} onClick={prevStep}>
									Предыдущий шаг
								</Button>
								<Button color='white'>Сохранить в черновики</Button>
							</div>
							<Button className={styles.submitButton}>Отправить на модерацию</Button>
						</div>
					) : (
						<div className={styles.buttons}>
							<Button disabled={formStep == 1} onClick={prevStep}>
								Предыдущий шаг
							</Button>
							<Button onClick={nextStep}>Следующий шаг</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default withLayout(AddTour)

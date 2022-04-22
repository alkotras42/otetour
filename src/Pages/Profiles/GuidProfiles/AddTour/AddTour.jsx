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

const AddTour = () => {
	const [formStep, setFormStep] = useState(1)
	const { user, setUser } = useContext(UserContext)

	const [value, setValue] = useState({ id: 1 })

	useEffect(() => {
		if (user) {
			setValue({ id: user.profile.id })
		}
	}, [user])

	const nextStep = () => {
		setFormStep((prev) => prev + 1)
	}

	const prevStep = () => {
		setFormStep((prev) => prev - 1)
	}

	const [inputList, setInputList] = useState([
		{
			name: '',
			lastname: '',
			email: '',
			phone: '',
		},
	])

	const [loading, setLoading] = useState(false)

	const handleChange = (e, i) => {
		const { name, value } = e.target
		const list = [...inputList]
		list[i][name] = value
		setInputList(list)
	}

	const handleAddClick = () => {
		setInputList([
			...inputList,
			{
				name: '',
				lastname: '',
				email: '',
				phone: '',
			},
		])
	}

	const handleRemoveClick = (i) => {
		const list = [...inputList]
		list.splice(i, 1)
		setInputList(list)
	}

	return (
		<div className={styles.tourPay}>
			<div className={styles.tourPayWrapper}>
				<div className={styles.breadcrumbs}>
					<Link to='/'>Главная</Link> / <Link to={'/user/tours/' + hashids.encode(value.id)}>Мои туры</Link> / Добавить тур
				</div>
				<p className={styles.title}>Добавить тур</p>
				<div className={styles.forms}>
					<FirstStep
						className={cn({
							[styles.hide]: formStep != 1,
						})}
					/>
					<SecondStep
						className={cn({
							[styles.hide]: formStep != 2,
						})}
					/>
					<ThirdStep
						className={cn({
							[styles.hide]: formStep != 3,
						})}
					/>
				</div>

				<div className={styles.buttons}>
					<Button disabled={formStep == 1} onClick={prevStep}>
						Предыдущий шаг
					</Button>
					<Button onClick={nextStep}>Следующий шаг</Button>
				</div>
			</div>
		</div>
	)
}

export default withLayout(AddTour)

import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { withLayout } from '../../../../Layout/Layout'
import styles from './ProfileTourPay.module.css'
import { Button, Input } from '../../../../Component'
import { hashids, PersonalInfoSchema, PersonalPasswordSchema, priceRu } from '../../../../Helpers/helpers'
import { UserContext } from '../../../../Context/user.context'
import PlusIcon from './plusIcon.svg'
import CloseIcon from './closeIcon.svg'

const ProfileTourPay = () => {
	const { user, setUser } = useContext(UserContext)

	const [value, setValue] = useState({ id: 1 })

	useEffect(() => {
		if (user) {
			setValue({ id: user.profile.id })
		}
	}, [user])

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

	const tourData = {
		id: '1',
		owner_id: '0',
		country_id: '489',
		category_id: '1',
		language_id: '489',
		name: 'Путешествие по винодельням и виноградникам',
		length: '5',
		size: '20',
		price: '120000',
		prepayment: '20000',
		dateStart: '27 июня',
		dateEnd: '31 июня',
		remainPlases: '5',
		price_discount: '0.00',
		rate: '0.0',
		votes_count: '0',
		difficulty: '2',
		age_min: '13',
		image: 'https://media.otetour.com/cardImg2.png',
		category: '1',
		language_code: '489',
		language: '489',
		country_code: '489',
		country: '489',
	}

	return (
		<div className={styles.tourPay}>
			<div className={styles.tourPayWrapper}>
				<div className={styles.breadcrumbs}>
					<Link to='/'>Главная</Link> / <Link to={'/user/tours/' + hashids.encode(value.id)}>Мои туры</Link> / Оплата тура
				</div>
				<p className={styles.title}>Оплата тура</p>
				<div className={styles.tourInfo}>
					<p className={styles.tourInfoTitle}>Инфомация о туре</p>
					<div className={styles.tourInfoBody}>
						<span>Название</span>
						{tourData.name}
						<span>Даты</span>
						{tourData.dateStart + ' – ' + tourData.dateEnd}
						<span>Осталось мест</span>
						{tourData.remainPlases + ' из ' + tourData.size}
						<span>Количество участников</span>
						{inputList.length}
						<span>Общая стоимость тура</span>
						{priceRu(tourData.price)}
						<span>Предоплата (до 20 июня 2021 года)</span>
						{priceRu(tourData.prepayment)}
						<span>Финальная оплата (напрямую гиду)</span>
						{priceRu(tourData.price - tourData.prepayment)}
					</div>
					<p>*В случае, если предоплата не будет внесена до необходимой даты, бронь тура будет отменена.</p>
				</div>
				<div className={styles.touristsInfo}>
					<p className={styles.touristsInfoTitle}>Инфомация о путешественниках</p>
					<div className={styles.touristsContent}>
						{inputList.map((item, i) => (
							<div className={styles.touristsInfoItem}>
								<div className={styles.touristsInfoItemHeader}>
									<p className={styles.touristsInfoItemTitle}>{`${i + 1} путешественник`}</p>
									{i > 0 ? (
										<img src={CloseIcon} alt='' className={styles.closeIcon} onClick={() => handleRemoveClick(i)} />
									) : null}
								</div>
								<Input onChange={(e) => handleChange(e, i)} value={item.name} placeholder='Имя' name='name' />
								<Input onChange={(e) => handleChange(e, i)} value={item.lastname} placeholder='Фамилия' name='lastname' />
								<Input onChange={(e) => handleChange(e, i)} value={item.email} placeholder='Email' name='email' />
								<Input onChange={(e) => handleChange(e, i)} value={item.phone} placeholder='Телефон' name='phone' />
							</div>
						))}
						<div onClick={handleAddClick} className={styles.addTourist}>
							<img src={PlusIcon} alt='' />
							<p>Добавить путешественника</p>
						</div>
					</div>
				</div>
				<div className={styles.paymentChoose}>
					<p className={styles.paymentChooseTitle}>Варианты оплаты</p>
					<div className={styles.paymentChooseBody}>
						<div className={styles.paymentChooseItem}>
							<input id='radio-1' type='radio' name='radio' value='1' />
							<label for='radio-1'>{`Только предоплата – ${priceRu(tourData.prepayment)}`}</label>
						</div>
						<div className={styles.paymentChooseItem}>
							<input id='radio-2' type='radio' name='radio' value='2' />
							<label for='radio-2'>{`Только предоплата – ${priceRu(tourData.price)}`}</label>
						</div>
					</div>
					<p>*В случае предоплаты, финальную часть оплаты необходимо будет оплатить гиду на руки перед началом тура.</p>
				</div>
				<Button className={styles.confirmButton}>Оплатить</Button>
			</div>
		</div>
	)
}

export default withLayout(ProfileTourPay)

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import { withLayout } from '../../../../Layout/Layout'
import styles from './ProfilePayment.module.css'
import { getUser } from '../../../../Api/Authorization'
import { CardUserProfile, Input } from '../../../../Component'
import { priceRu } from '../../../../Helpers/helpers'

const ProfilePayment = () => {
	const [value, setValue] = useState(1)

	const changeMenu = (e) => {
		setValue(e.target.getAttribute('name'))
	}

	const tourData = {
		title: 'Путешествие по озерам (Карелия, Россия)',
		daysCount: 11,
		type: 'Вело-тур',
		date: 'Июнь 2021',
		price: 120000,
		prepayment: 15000,
		rating: 4.6,
		reviewCount: 630,
		img: 'cardImg3.png',
		dateStart: '20 мая',
		dateEnd: '28 мая',
		plasesHold: 6,
		plasesTotal: 20,
	}

	return (
		<div className={styles.profile}>
			<div className={styles.profileWrapper}>
				<div className={styles.breadcrumbs}>
					<Link to='/'>Главная</Link> / <Link to={'/user/' + getUser().id}>Личный кабинет</Link> /{' '}
					<Link to={'user/tours/' + getUser().id}>Мои туры</Link> / Оплата тура
				</div>
				<p className={styles.title}>Оплата тура</p>
				<div className={styles.tourInfo}>
					<p className={styles.sectionTitle}>Инфомация о туре</p>
					<div className={styles.tourInfoBody}>
						<span>Название</span>
						{tourData.title}
						<span>Даты</span>
						{tourData.dateStart + ' – ' + tourData.dateEnd}
						<span>Осталось мест</span>
						{tourData.plasesHold + ' из ' + tourData.plasesTotal}
						<span>Количество участников</span>1<span>Общая стоимость тура</span>
						{priceRu(tourData.price)}
						<span>Предоплата (до 20 июня 2021 года)</span>
						{priceRu(tourData.prepayment)}
						<span>Финальная оплата (напрямую гиду)</span>
						{priceRu(tourData.price - prepayment)}
					</div>
				</div>
				<div className={styles.travlersInfo}>
					<p className={styles.sectionTitle}>Инфомация о туре</p>
					<p>Первый путешественник.</p>
					<Input  placeholder='Имя'></Input>
					<Input placeholder='Фамилия'></Input>
					<Input placeholder='Email'></Input>
					<Input placeholder='Телефон'></Input>
				</div>
			</div>
		</div>
	)
}

export default withLayout(ProfilePayment)

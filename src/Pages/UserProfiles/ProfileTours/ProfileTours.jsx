import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import { Button, Card, CardDate, Carousel } from '../../../Component'
import { toPhone } from '../../../Helpers/helpers'
import { withLayout } from '../../../Layout/Layout'
import styles from './ProfileTours.module.css'

const ProfileTours = () => {
	const [value, setValue] = useState(1)

	const changeMenu = (e) => {
		setValue(e.target.getAttribute('name'))
	}

	const card_data = {
		title: 'Путешествие по озерам (Карелия, Россия)',
		daysCount: 11,
		type: 'Вело-тур',
		date: 'Июнь 2021',
		price: 20000,
		sale: true,
		oldPrice: 27000,
		rating: 4.6,
		reviewCount: 630,
		img: 'cardImg1.png',
	}

	return (
		<div className={styles.profile}>
			<div className={styles.profileWrapper}>
				<div className={styles.breadcrumbs}>
					<Link to='/'>Главная</Link> / Мои туры
				</div>
				<p className={styles.title}>Мои туры</p>
				<div className={styles.menu}>
					<div
						name='1'
						className={cn(styles.menuItem, {
							[styles.active]: value == 1,
						})}
						onClick={changeMenu}
					>
						Предстоящие
					</div>
					<div
						name='2'
						className={cn(styles.menuItem, {
							[styles.active]: value == 2,
						})}
						onClick={changeMenu}
					>
						Ждут оплаты
					</div>
					<div
						name='3'
						className={cn(styles.menuItem, {
							[styles.active]: value == 3,
						})}
						onClick={changeMenu}
					>
						Не подтвержденные
					</div>
					<div
						name='4'
						className={cn(styles.menuItem, {
							[styles.active]: value == 4,
						})}
						onClick={changeMenu}
					>
						Завершенные
					</div>
				</div>
			</div>
		</div>
	)
}

export default withLayout(ProfileTours)

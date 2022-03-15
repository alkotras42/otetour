import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import { withLayout } from '../../../../Layout/Layout'
import styles from './ProfileTours.module.css'
import { getUser } from '../../../../Api/Authorization'
import { CardUserProfile } from '../../../../Component'

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
					<Link to='/'>Главная</Link> / <Link to={'/user/' + getUser().id}>Личный кабинет</Link> / Мои туры
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
				<div
					className={cn(styles.toursList, {
						[styles.hide]: value != 1,
					})}
				>
					<div className={styles.items}>
						<CardUserProfile type='upcoming' card={card_data} />
						<CardUserProfile type='upcoming' card={card_data} />
						<CardUserProfile type='upcoming' card={card_data} />
						<CardUserProfile type='upcoming' card={card_data} />
					</div>
				</div>
				<div
					className={cn(styles.toursList, {
						[styles.hide]: value != 2,
					})}
				>
					<div className={styles.items}>
						<CardUserProfile type='waiting' card={card_data} />
						<CardUserProfile type='waiting' card={card_data} />
						<CardUserProfile type='waiting' card={card_data} />
						<CardUserProfile type='waiting' card={card_data} />
					</div>
				</div>
				<div
					className={cn(styles.toursList, {
						[styles.hide]: value != 3,
					})}
				>
					<div className={styles.items}>
						<CardUserProfile type='notConf' card={card_data} />
						<CardUserProfile type='notConf' card={card_data} />
						<CardUserProfile type='notConf' card={card_data} />
						<CardUserProfile type='notConf' card={card_data} />
					</div>
				</div>
				<div
					className={cn(styles.toursList, {
						[styles.hide]: value != 4,
					})}
				>
					<div className={styles.items}>
						<CardUserProfile type='completed' card={card_data} />
						<CardUserProfile type='completed' card={card_data} />
						<CardUserProfile type='completed' card={card_data} />
						<CardUserProfile type='completed' card={card_data} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default withLayout(ProfileTours)

import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getUserById } from '../../../../Api/Authorization'
import { Button, Card, CardDate, Carousel } from '../../../../Component'
import { toPhone } from '../../../../Helpers/helpers'
import { withLayout } from '../../../../Layout/Layout'
import styles from './ProfileMain.module.css'
import { hashids } from '../../../../Helpers/helpers'

const ProfileMain = () => {
	const [user, setUser] = useState(null)

	const params = useParams()

	const navigate = useNavigate()

	useEffect(() => {
		getUserById(hashids.decode(params.id)).then((res) => {
			if (res.data.data) {
				setUser(res.data)
			} else {
				navigate('/404')
			}
		})
	}, [])

	const cardDate = {
		img: 'cardImg1.png',
		title: 'Тур по озерам Карелии',
		dateStart: '20 мая',
		dateEnd: '27 мая',
		plasesHold: 16,
		plasesTotal: 20,
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
			{!user ? (
				<div>Loading...</div>
			) : (
				<div className={styles.profileWrapper}>
					<div className={styles.breadcrumbs}>
						<Link to='/'>Главная</Link> / Личный кабинет
					</div>
					<p className={styles.title}>Личный кабинет</p>
					<div className={styles.userMain}>
						<div className={styles.userInfo}>
							<img
								src={user.data.photo || '/images/stockUserImage.png'}
								alt='/images/stockUserImage.png'
								className={styles.profileImg}
							/>
							<div className={styles.userData}>
								<div className={styles.name}>{user.data.firstname + ' ' + user.data.lastname}</div>
								<div className={styles.email}>{user.data.email}</div>
								<div className={styles.phone}>{toPhone(user.data.phone)}</div>
								<Link to='/edit' className={styles.link}>
									Редактировать профиль
								</Link>
							</div>
						</div>
						<div className={styles.becomePartner}>
							<span className={styles.partnerTittle}>Стать партнером</span>
							<span className={styles.partnerBody}>
								Вы можете стать партнером и получать 1% от каждого путешествия, совершенного людьми, пришедшими по вашей ссылке.
							</span>
							<Button className={styles.button}>Стать партнером</Button>
						</div>
					</div>
					<Link to=''>
						<Button className={styles.switch}>Переключиться на кабинет гида</Button>
					</Link>
					<div className={styles.counts}>
						<div>
							50
							<p>путешествия вы совершили</p>
						</div>
						<div>
							50
							<p>дней вы были в путешествиях</p>
						</div>
						<div>
							50
							<p>стран вы посетили</p>
						</div>
					</div>
					<div className={styles.nearest}>
						<p className={styles.title}>Ближайшие туры</p>
						<Carousel className={styles.carousel} itemsCount={4} loop={true}>
							<CardDate card={cardDate}></CardDate>
							<CardDate card={cardDate}></CardDate>
							<CardDate card={cardDate}></CardDate>
							<CardDate card={cardDate}></CardDate>
							<CardDate card={cardDate}></CardDate>
						</Carousel>
					</div>

					<div className={styles.recommendations}>
						<p className={styles.title}>Рекомендованные туры</p>
						<Carousel className={styles.carousel} loop={true}>
							<Card card={card_data}></Card>
							<Card card={card_data}></Card>
							<Card card={card_data}></Card>
							<Card card={card_data}></Card>
							<Card card={card_data}></Card>
						</Carousel>
					</div>
				</div>
			)}
		</div>
	)
}

export default withLayout(ProfileMain)

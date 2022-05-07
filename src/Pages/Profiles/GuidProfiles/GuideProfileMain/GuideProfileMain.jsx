import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getUser, getUserById } from '../../../../Api/Authorization'
import { Button, Card, CardDate, Carousel, Loading, Table } from '../../../../Component'
import { hashids, priceRu, toPhone } from '../../../../Helpers/helpers'
import { withLayout } from '../../../../Layout/Layout'
import styles from './GuideProfileMain.module.css'
import { useCookies } from 'react-cookie'

const GuideProfileMain = () => {
	const [user, setUser] = useState(null)
	const navigate = useNavigate()

	const params = useParams()

	const [cookies, setCookie, removeCookie] = useCookies(['role'])

	useEffect(() => {
		getUserById(hashids.decode(params.id)).then((res) => {
			if (res.data.data) {
				setUser(res.data.data)
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

	const tableData = Array(7).fill({
		date: '12.06.2020',
		guide: 'Иван Иванов',
		tour: 'Тур по Карелии',
		price: 8405,
		percent: 8405,
		status: 'Не зачислено',
	})

	const changeToUser = () => {
		navigate('/user/' + params.id)
		removeCookie('role')
	}

	return (
		<div className={styles.profile}>
			{!user ? (
				<Loading />
			) : (
				<div className={styles.profileWrapper}>
					<div className={styles.breadcrumbs}>
						<Link to='/'>Главная</Link> / Личный кабинет
					</div>
					<p className={styles.title}>Личный кабинет</p>
					<div className={styles.userMain}>
						<div className={styles.userInfo}>
							<img src={user?.photo || '/images/stockUserImage.png'} alt='' className={styles.profileImg} />
							<div className={styles.userData}>
								<div className={styles.name}>{user?.name}</div>
								<div className={styles.email}>{user?.email}</div>
								<div className={styles.phone}>{user.phone && toPhone(user?.phone)}</div>
								<Link to='/guide/edit' className={styles.link}>
									Редактировать профиль
								</Link>
							</div>
						</div>
						<div className={styles.userAdditionalInfo}>
							<span>Реквизиты</span>
							{user?.cardNumber ? '**** **** **** ' + user?.cardNumber?.substr(-4) : '---- ---- ---- ----'}
							<span>Паспорт</span>
							{user?.passport ? user?.passport.substr(4) + ' ****' + user?.passport?.substr(-2) : '---- ------'}
							<span>Лицензия</span>
							<Link to='' className={styles.link}>
								Открыть
							</Link>
							<span>Договор</span>
							<Link to='' className={styles.link}>
								Открыть
							</Link>
						</div>
						<div className={styles.becomePartner}>
							<span className={styles.partnerTittle}>Ваша ссылка для приглашения гидов</span>
							<span className={styles.partnerBody}>
								Получайте 1% от стоимости туров, проданных гидами, пришедшими по вашей ссылке
							</span>
							<Link to='' className={styles.link}>
								otetour.ru/invite/i125k4
							</Link>
						</div>
					</div>
					<Button className={styles.switch} onClick={changeToUser}>
						Переключиться на кабинет туриста
					</Button>
					<div className={styles.description}>
						<p className={cn(styles.title, styles.descriptionTitle)}>Описание для туристов</p>
						<p className={styles.descriptionBody}>
							Описание для туристов. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit tortor at massa
							accumsan, sed faucibus in. Nascetur vitae at nisi feugiat neque, velit eget maecenas consequat. Turpis ut viverra
							nibh sagittis sed ut gravida pharetra. Ornare quam penatibus pellentesque dignissim tellus tristique arcu ac.
						</p>
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
					<div className={styles.recomendations}>
						<p className={cn(styles.title, styles.recomendationsTitle)}>Описание для туристов</p>
						<p className={styles.recomendationsBody}>
							Описание для туристов. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit tortor at massa
							accumsan, sed faucibus in. Nascetur vitae at nisi feugiat neque, velit eget maecenas consequat. Turpis ut viverra
							nibh sagittis sed ut gravida pharetra. Ornare quam penatibus pellentesque dignissim tellus tristique arcu ac.
						</p>
						<ul>
							<li>Пункт с рекомендациями.</li>
							<li>Пункт с рекомендациями.</li>
							<li>Пункт с рекомендациями.</li>
						</ul>
					</div>
					<div className={styles.counts}>
						<div>
							{user?.guidesRegister || '-'}
							<p>гидов вы зарегистрировали</p>
						</div>
						<div>
							{user?.income ? priceRu(user?.income) : '-'}
							<p>вы заработали</p>
						</div>
						<div>
							{user?.mounthIncome ? priceRu(user?.mounthIncome) : '-'}
							<p>вы заработали за {new Date().toLocaleString('ru-ru', { month: 'long' })}</p>
						</div>
					</div>
					<div className={styles.table}>
						<Table type='guide' data={tableData} />
					</div>
				</div>
			)}
		</div>
	)
}

export default withLayout(GuideProfileMain)

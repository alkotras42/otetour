import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getUser } from '../../../../Api/Authorization'
import { Button, Card, CardDate, Carousel } from '../../../../Component'
import { toPhone } from '../../../../Helpers/helpers'
import { withLayout } from '../../../../Layout/Layout'
import styles from './ProfileDispute.module.css'

const ProfileDispute = () => {
	const disputs = [
		{
			tourTitle: 'Лучшие достопримечательности Индии',
			tourType: 'Экскурсионный тур',
			tourDateStart: '20 мая 2019',
			tourDateEnd: '27 мая 2019 ',
			tourImg: 'disputImg1.png',
			disputBody:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda blanditiis aperiam libero ipsum, placeat dicta ad tenetur! Aliquid libero repellat veniam, enim totam commodi accusantium quod, itaque ut corrupti explicabo.',
			disputComments: [
				{
					comentUser: 'Сергей',
					commentBody:
						'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem perspiciatis perferendis, molestiae maxime voluptatum est.',
				},
			],
		},
		{
			tourTitle: 'Путешествие по озерам Карелии',
			tourType: 'Водный тур',
			tourDateStart: '20 мая 2019',
			tourDateEnd: '27 мая 2019 ',
			tourImg: 'disputImg1.png',
			disputBody:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda blanditiis aperiam libero ipsum, placeat dicta ad tenetur! Aliquid libero repellat veniam, enim totam commodi accusantium quod, itaque ut corrupti explicabo.',
			disputComments: [],
		},
	]

	return (
		<div className={styles.profile}>
			<div className={styles.profileWrapper}>
				<div className={styles.breadcrumbs}>
					<Link to='/'>Главная</Link> / Споры
				</div>
				<p className={styles.title}>Споры</p>
				<div className={styles.disputs}>
					{disputs.map((disput) => (
						<div className={styles.disputItem}>
							<div className={styles.disputHeader}>
								<img src={'/images/' + disput.tourImg} alt='' />
								<div className={styles.disputData}>
									<div className={styles.tourType}>{disput.tourType}</div>
									<div className={styles.tourTitle}>{disput.tourTitle}</div>
									<div className={styles.tourDates}>{`${disput.tourDateStart} — ${disput.tourDateEnd}`}</div>
								</div>
							</div>
							<div className={styles.disputBody}>{disput.disputBody}</div>
							{disput.disputComments &&
								disput.disputComments.map((comment) => (
									<div className={styles.commentItem}>
										<div className={styles.commentInfo}>
											<div className={styles.comentUser}>{comment.comentUser}</div>
											<div className={styles.commentBody}>{comment.commentBody}</div>
										</div>
										<div className={styles.commentButtons}>
											<span className={styles.accept}>Принять условия</span>
											<span className={styles.decline}>Отказаться</span>
										</div>
									</div>
								))}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default withLayout(ProfileDispute)

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Comment } from '../../../../Component'
import { withLayout } from '../../../../Layout/Layout'
import styles from './ProfileReviews.module.css'

const ProfileReviews = () => {
	const { t } = useTranslation(t)
	const reviews = [
		{
			tourTitle: 'Лучшие достопримечательности Индии',
			tourType: 'Экскурсионный тур',
			date: '20 мая 2019',
			tourImg: 'disputImg1.png',
			rating: '3',
			reviewBody:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda blanditiis aperiam libero ipsum, placeat dicta ad tenetur! Aliquid libero repellat veniam, enim totam commodi accusantium quod, itaque ut corrupti explicabo.',
			reviewComments: [
				{
					comentUser: 'Сергей',
					commentDate: '25 мая 2019',
					commentBody:
						'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem perspiciatis perferendis, molestiae maxime voluptatum est.',
				},
			],
		},
		{
			tourTitle: 'Лучшие достопримечательности Индии',
			tourType: 'Экскурсионный тур',
			date: '20 мая 2019',
			tourImg: 'disputImg1.png',
			rating: '1',
			reviewBody:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores veniam alias illo unde provident quasi natus ex quidem, delectus qui laudantium soluta iste labore non? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda blanditiis aperiam libero ipsum, placeat dicta ad tenetur! Aliquid libero repellat veniam, enim totam commodi accusantium quod, itaque ut corrupti explicabo.',
			disputComments: [],
			images: [{ url: '/images/blogImg1.png' }, { url: '/images/cardImg1.png' }],
		},
	]

	return (
		<div className={styles.profile}>
			<div className={styles.profileWrapper}>
				<div className={styles.breadcrumbs}>
					<Link to='/'>Главная</Link> / Мои отзывы
				</div>
				<p className={styles.title}>{t('Мои отзывы')}</p>
				<div className={styles.reviews}>
					{reviews.map((review) => (
						<Comment type='review' comment={review} />
					))}
				</div>
			</div>
		</div>
	)
}

export default withLayout(ProfileReviews)

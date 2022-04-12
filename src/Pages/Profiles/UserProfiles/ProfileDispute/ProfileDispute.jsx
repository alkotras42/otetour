import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Comment } from '../../../../Component'
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
						<Comment type='dispute' comment={disput} />
					))}
				</div>
			</div>
		</div>
	)
}

export default withLayout(ProfileDispute)

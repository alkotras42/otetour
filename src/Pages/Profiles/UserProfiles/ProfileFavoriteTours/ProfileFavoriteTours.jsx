import React, { useContext, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import { withLayout } from '../../../../Layout/Layout'
import styles from './ProfileFavoriteTours.module.css'
import { CardFavorite } from '../../../../Component'
import ReactPaginate from 'react-paginate'
import { UserContext } from '../../../../Context/user.context'
import { hashids } from '../../../../Helpers/helpers'

const ProfileFavoriteTours = () => {
	const [currentItems, setCurrentItems] = useState([])
	const [pageCount, setPageCount] = useState(0)
	const [itemOffset, setItemOffset] = useState(0)

	const { user, setUser } = useContext(UserContext)

	const [userValue, setUserValue] = useState({ id: 1 })

	useEffect(() => {
		if (user) {
			setUserValue({ id: user.profile.id })
		}
	}, [user])

	const itemsPerPage = 6

	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage
		setCurrentItems(cardsArray.slice(itemOffset, endOffset))
		setPageCount(Math.ceil(cardsArray.length / itemsPerPage))
	}, [itemOffset, itemsPerPage])

	const card_data = {
		title: 'Путешествие по озерам (Карелия, Россия)',
		daysCount: 11,
		type: 'Вело-тур',
		date: 'Июнь 2021',
		price: 20000,
		sale: true,
		oldPrice: 27000,
		rating: 4.4,
		reviewCount: 630,
		img: 'cardImg4.png',
		dateStart: '20 мая',
		dateEnd: '28 мая',
		plasesHold: 6,
		plasesTotal: 20,
	}

	const cardsArray = Array(10).fill(card_data)

	const handlePageClick = (e) => {
		const newOffset = (e.selected * itemsPerPage) % cardsArray.length
		setItemOffset(newOffset)
	}

	return (
		<div className={styles.profile}>
			<div className={styles.profileWrapper}>
				<div className={styles.breadcrumbs}>
					<Link to='/'>Главная</Link> / <Link to={'/user/' + hashids.encode(userValue.id)}>Личный кабинет</Link> / Избранные
					туры
				</div>
				<p className={styles.title}>Избранные туры</p>

				<div className={styles.items}>
					{currentItems.map((item, index) => (
						<CardFavorite key={index} card={item} />
					))}
				</div>
				{cardsArray.length > 6 && (
					<ReactPaginate
						breakLabel='...'
						nextLabel='>'
						onPageChange={handlePageClick}
						pageRangeDisplayed={5}
						marginPagesDisplayed={1}
						pageCount={pageCount}
						previousLabel='<'
						renderOnZeroPageCount={null}
						containerClassName={styles.pagination}
						pageLinkClassName={styles.pageItem}
						previousLinkClassName={styles.pageItem}
						nextLinkClassName={styles.pageItem}
						disabledLinkClassName={styles.pageDisabled}
						activeLinkClassName={styles.pageActive}
					/>
				)}
			</div>
		</div>
	)
}

export default withLayout(ProfileFavoriteTours)

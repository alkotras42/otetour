import React, { useContext, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import { withLayout } from '../../../../Layout/Layout'
import styles from './ProfileTours.module.css'
import { CardUserProfile } from '../../../../Component'
import ReactPaginate from 'react-paginate'
import { UserContext } from '../../../../Context/user.context'
import { hashids } from '../../../../Helpers/helpers'
import ArrowIcon from './arrow.svg'

const ProfileTours = () => {
	const [value, setValue] = useState(1)
	const [currentItems, setCurrentItems] = useState([])
	const [pageCount, setPageCount] = useState(0)
	const [itemOffset, setItemOffset] = useState(0)

	const { user, setUser } = useContext(UserContext)

	const [userValue, setUserValue] = useState({ id: 1 })

	const [showMenuDropdown, setShowMenuDropdown] = useState(false)

	const selectMenuRef = useRef()

	// Для закрытия менюшек при нажатии вне их
	useEffect(() => {
		const checkIfClickedOutside = (e) => {
			if (showMenuDropdown && selectMenuRef.current && !selectMenuRef.current.contains(e.target)) {
				setShowMenuDropdown(false)
			}
		}

		document.addEventListener('mousedown', checkIfClickedOutside)

		return () => {
			document.removeEventListener('mousedown', checkIfClickedOutside)
		}
	}, [showMenuDropdown])

	useEffect(() => {
		if (user) {
			setUserValue({ id: user.profile.id })
		}
	}, [user])

	const changeMenu = (e) => {
		setValue(e.target.getAttribute('name'))
	}

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
		rating: 4.6,
		reviewCount: 630,
		img: 'cardImg3.png',
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

	const statuses = ['Предстоящие', 'Ждут оплаты', 'Не подтвержденные', 'Завершенные']

	return (
		<div className={styles.profile}>
			<div className={styles.profileWrapper}>
				<div className={styles.breadcrumbs}>
					<Link to='/'>Главная</Link> / <Link to={'/user/' + hashids.encode(userValue.id)}>Личный кабинет</Link> / Мои туры
				</div>
				<p className={styles.title}>Мои туры</p>
				<div className={styles.menu}>
					{statuses.map((status, index) => (
						<div
							key={index}
							className={cn(styles.menuItem, {
								[styles.active]: value == index + 1,
							})}
							onClick={() => setValue(index + 1)}
						>
							{status}
						</div>
					))}
				</div>
				<div onClick={() => setShowMenuDropdown((prev) => !prev)} className={styles.selectMenu}>
					<div>{statuses[value - 1]} <img src={ArrowIcon} alt="" className={styles.arrowIcon} /> </div>
					<div
						className={cn(styles.selectMenuDropdown, {
							[styles.hide]: !showMenuDropdown,
						})}
						ref={selectMenuRef}
					>
						{statuses.map((status, index) => (
							<div
								key={index}
								className={cn(styles.selectMenuItem, {
									[styles.selectMenuActive]: value == index + 1,
								})}
								onClick={() => setValue(index + 1)}
							>
								{status}
							</div>
						))}
					</div>
				</div>
				<div
					className={cn(styles.toursList, {
						[styles.hide]: value != 1,
					})}
				>
					<div className={styles.items}>
						{currentItems.map((item, index) => (
							<CardUserProfile key={index} type='upcoming' card={item} />
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

import React, { useContext, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import { withLayout } from '../../../../Layout/Layout'
import styles from './GuideProfileTours.module.css'
import { Button, CardGuideProfile, CardUserProfile, Loading } from '../../../../Component'
import ReactPaginate from 'react-paginate'
import { UserContext } from '../../../../Context/user.context'
import { hashids } from '../../../../Helpers/helpers'
import ArrowIcon from './arrow.svg'
import { getTours } from '../../../../Api/Tour'

const GuideProfileTours = () => {
	const [value, setValue] = useState(1)
	const [tours, setTours] = useState(null)
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
			;(async () => {
				setTours(await getTours(user.token))
			})()
		}
	}, [user])

	const changeMenu = (e) => {
		setValue(e.target.getAttribute('name'))
	}

	const itemsPerPage = 6

	useEffect(() => {
		if (tours) {
			const endOffset = itemOffset + itemsPerPage
			setCurrentItems(tours.slice(itemOffset, endOffset))
			setPageCount(Math.ceil(tours.length / itemsPerPage))
		}
	}, [itemOffset, itemsPerPage, tours])

	useEffect(() => {
		if (tours) {
			if (value == 1) {
				setCurrentItems(tours.filter((tour) => tour.status == 4))
			}
			if (value == 2) {
				setCurrentItems(tours.filter((tour) => tour.status == 2))
			}
			if (value == 3) {
				setCurrentItems(tours.filter((tour) => tour.status == 3))
			}
			if (value == 4) {
				setCurrentItems(tours.filter((tour) => tour.status == 1))
			}
		}
	}, [tours, value])

	const handlePageClick = (e) => {
		const newOffset = (e.selected * itemsPerPage) % tours.length
		setItemOffset(newOffset)
	}

	const statuses = ['Действующие', 'На проверке', 'Отклоненные', 'Черновики', 'Архив']

	return (
		<div className={styles.profile}>
			{!user ? (
				<Loading />
			) : (
				<div className={styles.profileWrapper}>
					<div className={styles.breadcrumbs}>
						<Link to='/'>Главная</Link> / <Link to={'/guide/' + hashids.encode(userValue.id)}>Личный кабинет</Link> / Мои туры
					</div>
					<p className={styles.title}>Мои туры</p>
					<div className={styles.profileHeader}>
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
						<Link to='/guide/addTour' className={styles.addTourLink}>
							<Button className={styles.addTourButton}>Добавить тур</Button>
						</Link>
					</div>
					<div onClick={() => setShowMenuDropdown((prev) => !prev)} className={styles.selectMenu}>
						<div>
							{statuses[value - 1]} <img src={ArrowIcon} alt='' className={styles.arrowIcon} />{' '}
						</div>
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
					{!currentItems ? (
						<Loading />
					) : (
						<>
							<div
								className={cn(styles.toursList, {
									[styles.hide]: value != 1,
								})}
							>
								<div className={styles.items}>
									{currentItems.map((tour, index) => (
										<CardGuideProfile key={index} type='current' card={tour} />
									))}
								</div>
								{currentItems.length > 6 && (
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
										activeLinkClassName={styles.pasgeActive}
									/>
								)}
							</div>
							<div
								className={cn(styles.toursList, {
									[styles.hide]: value != 2,
								})}
							>
								<div className={styles.items}>
									{currentItems.map((tour, index) => (
										<CardGuideProfile key={index} type='onReview' card={tour} />
									))}
								</div>
								{currentItems.length > 6 && (
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
										activeLinkClassName={styles.pasgeActive}
									/>
								)}
							</div>
						</>
					)}

					<div
						className={cn(styles.toursList, {
							[styles.hide]: value != 2,
						})}
					>
						<div className={styles.items}>
							{/* <CardGuideProfile type='onReview' card={card_data} />
							<CardGuideProfile type='onReview' card={card_data} />
							<CardGuideProfile type='onReview' card={card_data} />
							<CardGuideProfile type='onReview' card={card_data} /> */}
						</div>
					</div>
					<div
						className={cn(styles.toursList, {
							[styles.hide]: value != 3,
						})}
					>
						<div className={styles.items}>
							{/* <CardGuideProfile type='rejected' card={card_data} />
							<CardGuideProfile type='rejected' card={card_data} />
							<CardGuideProfile type='rejected' card={card_data} />
							<CardGuideProfile type='rejected' card={card_data} /> */}
						</div>
					</div>
					<div
						className={cn(styles.toursList, {
							[styles.hide]: value != 4,
						})}
					>
						<div className={styles.items}>
							{/* <CardGuideProfile type='draft' card={card_data} />
							<CardGuideProfile type='draft' card={card_data} />
							<CardGuideProfile type='draft' card={card_data} />
							<CardGuideProfile type='draft' card={card_data} /> */}
						</div>
					</div>
					<div
						className={cn(styles.toursList, {
							[styles.hide]: value != 5,
						})}
					>
						<div className={styles.items}>
							{/* <CardGuideProfile type='archive' card={card_data} />
							<CardGuideProfile type='archive' card={card_data} />
							<CardGuideProfile type='archive' card={card_data} />
							<CardGuideProfile type='archive' card={card_data} /> */}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default withLayout(GuideProfileTours)

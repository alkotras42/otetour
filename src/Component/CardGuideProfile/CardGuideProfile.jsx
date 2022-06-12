import React, { useContext, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import styles from './CardGuideProfile.module.css'
import startIcon from './star.svg'
import menuIcon from './menu.svg'
import Modal from 'react-modal'
import { priceRu } from '../../Helpers/helpers'
import { Link } from 'react-router-dom'
import { Loading } from '../Loading/Loading'
import { deleteTour } from '../../Api/Tour'
import { UserContext } from '../../Context/user.context'
import { Button } from '../Button/Button'

export const CardGuideProfile = ({ className, card, type, ...props }) => {
	const [showDropdown, setShowDropdown] = useState(false)
	const [deliting, setDeliting] = useState({ loading: false, error: '', success: '' })

	const [isDeleteTourModalOpen, setIsDeleteTourModalOpen] = useState(false)

	const { user, setUser } = useContext(UserContext)

	const changeDropdown = () => {
		setShowDropdown((prev) => !prev)
	}

	const dropdownMenuRef = useRef()

	useEffect(() => {
		const checkIfClickedOutside = (e) => {
			if (showDropdown && dropdownMenuRef.current && !dropdownMenuRef.current.contains(e.target)) {
				setShowDropdown(false)
			}
		}
		document.addEventListener('mousedown', checkIfClickedOutside)
		return () => {
			document.removeEventListener('mousedown', checkIfClickedOutside)
		}
	}, [showDropdown])

	const deleteCard = async () => {
		setDeliting({ ...deliting, loading: true })
		try {
			deleteTour(card.id, user.token)
			setDeliting({ ...deliting, loading: false, success: 'Тур успешно удален' })
		} catch (e) {
			setDeliting({ ...deliting, loading: false, error: e.message })
		}
	}

	const CurrentCard = ({ card }) => (
		<div className={cn(className, styles.card)} {...props}>
			<div className={styles.cardTop}>
				<img
					src={
						(card.pictures?.length && card.pictures[0]) ||
						card.pictures ||
						'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA='
					}
					alt=''
					className={styles.image}
				/>
				<div className={styles.cardLanguages}>
					{card.descriptions &&
						Object.values(card.descriptions).map((description) => (
							<div className={styles.cardLanguageItem}>{description.language}</div>
						))}
				</div>
				<img src={menuIcon} alt='' className={styles.menuIcon} onClick={changeDropdown} />
				{showDropdown && (
					<div className={styles.dropdownWrapper} ref={dropdownMenuRef}>
						<Link to={`/guide/addTour/${card.id}`}>
							<p>Редактировать</p>
						</Link>
						<p>Добавить в архив</p>
						<p
							onClick={() => {
								setIsDeleteTourModalOpen(true)
								setShowDropdown(false)
							}}
							className={styles.dropdownItemRed}
						>
							Удалить
						</p>
					</div>
				)}
				<Modal
					isOpen={isDeleteTourModalOpen}
					onRequestClose={() => setIsDeleteTourModalOpen(false)}
					className={styles.modal}
				>
					<p>Вы уверены, что хотите удалить тур?</p>
					<div className={styles.deleteTourItems}>
						<p onClick={() => setIsDeleteTourModalOpen(false)}>Отмена</p>
						<p className={styles.dropdownItemRed} onClick={deleteCard}>
							Удалить
						</p>
					</div>
					{deliting.loading && <Loading />}
					{deliting.error && <p className={styles.error}>{deliting.error}</p>}
					{deliting.success && <p className={styles.success}>{deliting.success}</p>}
				</Modal>
				<div className={styles.rating}>
					<img src={startIcon} alt='' className={styles.star} />
					<span className={styles.ratingCount}>{card.rating}</span>
					<span className={styles.reviewCount}>({card.reviewCount} отзывов)</span>
				</div>
			</div>
			<div className={styles.cardBottom}>
				<div className={styles.type}>{card.category_name}</div>
				<div className={styles.title}>{card.name}</div>
				<div className={styles.info}>
					<span>Длительность</span>
					{card.length_days + ' дней'}
					<span>Ближашие даты</span>
					{`${card.closesDate || '?'} — ${card.plasesHold || '?'} из ${card.plasesTotal || '?'} мест `}
					<span>Стоимость</span>
					{card.sale ? (
						<div className={styles.prices}>
							<span className={styles.salePrice}>{priceRu(card.price)}</span>
							<span className={styles.oldPrice}>{priceRu(card.oldPrice)}</span>
						</div>
					) : (
						<div className={styles.prices}>
							<span className={styles.price}>{priceRu(card.price)}</span>
						</div>
					)}
				</div>
				<Link to={`/tour/${card.id}/trips`}>
					<Button className={styles.button}>Даты</Button>
				</Link>
			</div>
		</div>
	)

	const OnReviewCard = ({ card }) => (
		<div className={cn(className, styles.card)} {...props}>
			<div className={styles.cardTop}>
				<img
					src={
						(card.pictures?.length && card.pictures[0]) ||
						card.pictures ||
						'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA='
					}
					alt=''
					className={styles.image}
				/>
				<div className={styles.cardLanguages}>
					{card.descriptions &&
						Object.values(card.descriptions).map((description) => (
							<div className={styles.cardLanguageItem}>{description.language}</div>
						))}
				</div>
				<img src={menuIcon} alt='' className={styles.menuIcon} onClick={changeDropdown} />
				{showDropdown && (
					<div className={styles.dropdownWrapper} ref={dropdownMenuRef}>
						<p>Добавить в черновики</p>
						<p onClick={() => setIsDeleteTourModalOpen(true)} className={styles.dropdownItemRed}>
							Удалить
						</p>
					</div>
				)}
				<Modal
					isOpen={isDeleteTourModalOpen}
					onRequestClose={() => setIsDeleteTourModalOpen(false)}
					className={styles.modal}
				>
					<p>Вы уверены, что хотите удалить тур?</p>
					<div className={styles.deleteTourItems}>
						<p onClick={() => setIsDeleteTourModalOpen(false)}>Отмена</p>
						<p className={styles.dropdownItemRed}>Удалить</p>
					</div>
				</Modal>
			</div>
			<div className={styles.cardBottom}>
				<div className={styles.type}>{card.category_name}</div>
				<div className={styles.title}>{card.name}</div>
				<div className={styles.info}>
					<span>Длительность</span>
					{card.length_days + ' дней'}
					<span>Ближашие даты</span>
					{`${card.closesDate || '?'} — ${card.plasesHold || '?'} из ${card.plasesTotal || '?'} мест `}
					<span>Стоимость</span>
					{card.sale ? (
						<div className={styles.prices}>
							<span className={styles.salePrice}>{priceRu(card.price)}</span>
							<span className={styles.oldPrice}>{priceRu(card.oldPrice)}</span>
						</div>
					) : (
						<div className={styles.prices}>
							<span className={styles.price}>{priceRu(card.price)}</span>
						</div>
					)}
				</div>
				<Link to={`/tour/${card.id}/trips`}>
					<Button className={styles.button}>Даты</Button>
				</Link>
			</div>
		</div>
	)

	const RejectedCard = ({ card }) => (
		<div className={cn(className, styles.card)} {...props}>
			<div className={styles.cardTop}>
				<img
					src={
						(card.pictures?.length && card.pictures[0]) ||
						card.pictures ||
						'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA='
					}
					alt=''
					className={styles.image}
				/>
				<div className={styles.cardLanguages}>
					{card.language &&
						Object.values(card.language).map((lng) => (
							<div className={styles.cardLanguageItem}>{lng}</div>
						))}
				</div>
				<img src={menuIcon} alt='' className={styles.menuIcon} onClick={changeDropdown} />
				{showDropdown && (
					<div className={styles.dropdownWrapper} ref={dropdownMenuRef}>
						<p>Редактировать</p>
						<p>Добавить в черновики</p>
						<p onClick={() => setIsDeleteTourModalOpen(true)} className={styles.dropdownItemRed}>
							Удалить
						</p>
					</div>
				)}
				<Modal
					isOpen={isDeleteTourModalOpen}
					onRequestClose={() => setIsDeleteTourModalOpen(false)}
					className={styles.modal}
				>
					<p>Вы уверены, что хотите удалить тур?</p>
					<div className={styles.deleteTourItems}>
						<p onClick={() => setIsDeleteTourModalOpen(false)}>Отмена</p>
						<p className={styles.dropdownItemRed}>Удалить</p>
					</div>
				</Modal>
			</div>
			<div className={styles.cardBottom}>
				<div className={styles.type}>{card.type}</div>
				<div className={styles.title}>{card.title}</div>
				<div className={styles.info}>
					<span>Длительность</span>
					{card.daysCount + ' дней'}
					<span>Ближашие даты</span>
					{`${card.closesDate} — ${card.plasesHold} из ${card.plasesTotal} мест `}
					<span>Стоимость</span>
					{card.sale ? (
						<div className={styles.prices}>
							<span className={styles.salePrice}>{priceRu(card.price)}</span>
							<span className={styles.oldPrice}>{priceRu(card.price_discount)}</span>
						</div>
					) : (
						<div className={styles.prices}>
							<span className={styles.price}>{priceRu(card.price)}</span>
						</div>
					)}
				</div>
			</div>
		</div>
	)

	const DraftCard = ({ card }) => (
		<div className={cn(className, styles.card)} {...props}>
			<div className={styles.cardTop}>
				<img
					src={
						(card.pictures?.length && card.pictures[0]) ||
						card.pictures ||
						'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA='
					}
					alt=''
					className={styles.image}
				/>
				<div className={styles.cardLanguages}>
					{card.descriptions &&
						Object.values(card.descriptions).map((description) => (
							<div className={styles.cardLanguageItem}>{description.language}</div>
						))}
				</div>
				<img src={menuIcon} alt='' className={styles.menuIcon} onClick={changeDropdown} />
				{showDropdown && (
					<div className={styles.dropdownWrapper} ref={dropdownMenuRef}>
						<p>Редактировать</p>
						<p onClick={() => setIsDeleteTourModalOpen(true)} className={styles.dropdownItemRed}>
							Удалить
						</p>
					</div>
				)}
				<Modal
					isOpen={isDeleteTourModalOpen}
					onRequestClose={() => setIsDeleteTourModalOpen(false)}
					className={styles.modal}
				>
					<p>Вы уверены, что хотите удалить тур?</p>
					<div className={styles.deleteTourItems}>
						<p onClick={() => setIsDeleteTourModalOpen(false)}>Отмена</p>
						<p className={styles.dropdownItemRed}>Удалить</p>
					</div>
				</Modal>
			</div>
			<div className={styles.cardBottom}>
				<div className={styles.type}>{card.type}</div>
				<div className={styles.title}>{card.title}</div>
				<div className={styles.info}>
					<span>Длительность</span>
					{card.daysCount + ' дней'}
					<span>Ближашие даты</span>
					{`${card.closesDate} — ${card.plasesHold} из ${card.plasesTotal} мест `}
					<span>Стоимость</span>
					{card.sale ? (
						<div className={styles.prices}>
							<span className={styles.salePrice}>{priceRu(card.price)}</span>
							<span className={styles.oldPrice}>{priceRu(card.oldPrice)}</span>
						</div>
					) : (
						<div className={styles.prices}>
							<span className={styles.price}>{priceRu(card.price)}</span>
						</div>
					)}
				</div>
			</div>
		</div>
	)

	const ArchiveCard = ({ card }) => (
		<div className={cn(className, styles.card)} {...props}>
			<div className={styles.cardTop}>
				<img
					src={
						(card.pictures?.length && card.pictures[0]) ||
						card.pictures ||
						'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA='
					}
					alt=''
					className={styles.image}
				/>
				<img src={menuIcon} alt='' className={styles.menuIcon} onClick={changeDropdown} />
				{showDropdown && (
					<div className={styles.dropdownWrapper} ref={dropdownMenuRef}>
						<p>Редактировать</p>
						<p>Добавить в действующие</p>
						<p onClick={() => setIsDeleteTourModalOpen(true)} className={styles.dropdownItemRed}>
							Удалить
						</p>
					</div>
				)}
				<Modal
					isOpen={isDeleteTourModalOpen}
					onRequestClose={() => setIsDeleteTourModalOpen(false)}
					className={styles.modal}
				>
					<p>Вы уверены, что хотите удалить тур?</p>
					<div className={styles.deleteTourItems}>
						<p onClick={() => setIsDeleteTourModalOpen(false)}>Отмена</p>
						<p className={styles.dropdownItemRed}>Удалить</p>
					</div>
				</Modal>
			</div>
			<div className={styles.cardBottom}>
				<div className={styles.type}>{card.type}</div>
				<div className={styles.title}>{card.title}</div>
				<div className={styles.info}>
					<span>Длительность</span>
					{card.daysCount + ' дней'}
					<span>Ближашие даты</span>
					{`${card.closesDate} — ${card.plasesHold} из ${card.plasesTotal} мест `}
					<span>Стоимость</span>
					{card.sale ? (
						<div className={styles.prices}>
							<span className={styles.salePrice}>{priceRu(card.price)}</span>
							<span className={styles.oldPrice}>{priceRu(card.oldPrice)}</span>
						</div>
					) : (
						<div className={styles.prices}>
							<span className={styles.price}>{priceRu(card.price)}</span>
						</div>
					)}
				</div>
			</div>
		</div>
	)

	return (() => {
		switch (type) {
			case 'current':
				return <CurrentCard card={card} />
			case 'onReview':
				return <OnReviewCard card={card} />
			case 'rejected':
				return <RejectedCard card={card} />
			case 'draft':
				return <DraftCard card={card} />
			case 'archive':
				return <ArchiveCard card={card} />
		}
	})()
}

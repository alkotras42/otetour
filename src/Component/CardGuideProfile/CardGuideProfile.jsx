import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import styles from './CardGuideProfile.module.css'
import startIcon from './star.svg'
import menuIcon from './menu.svg'
import Modal from 'react-modal'
import { priceRu } from '../../Helpers/helpers'

export const CardGuideProfile = ({ className, card, type, ...props }) => {
	const [showDropdown, setShowDropdown] = useState(false)

	const [isDeleteTourModalOpen, setisDeleteTourModalOpen] = useState(false)

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

	const CurrentCard = ({ card }) => (
		<div className={cn(className, styles.card)} {...props}>
			<div className={styles.cardTop}>
				<img src={`/images/${card.img}`} alt='' className={styles.image} />
				<img src={menuIcon} alt='' className={styles.menuIcon} onClick={changeDropdown} />
				{showDropdown && (
					<div className={styles.dropdownWrapper} ref={dropdownMenuRef}>
						<p className={styles.addTrip}>Добавить поездку</p>
						<p>Редактировать</p>
						<p>Добавить в архив</p>
						<p onClick={() => setisDeleteTourModalOpen(true)} className={styles.dropdownItemRed}>
							Удалить
						</p>
					</div>
				)}
				<Modal
					isOpen={isDeleteTourModalOpen}
					onRequestClose={() => setisDeleteTourModalOpen(false)}
					className={styles.modal}
				>
					<p>Вы уверены, что хотите удалить тур?</p>
					<div className={styles.deleteTourItems}>
						<p onClick={() => setisDeleteTourModalOpen(false)}>Отмена</p>
						<p className={styles.dropdownItemRed}>Удалить</p>
					</div>
				</Modal>
				<div className={styles.rating}>
					<img src={startIcon} alt='' className={styles.star} />
					<span className={styles.ratingCount}>{card.rating}</span>
					<span className={styles.reviewCount}>({card.reviewCount} отзывов)</span>
				</div>
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

	const OnReviewCard = ({ card }) => (
		<div className={cn(className, styles.card)} {...props}>
			<div className={styles.cardTop}>
				<img src={`/images/${card.img}`} alt='' className={styles.image} />
				<img src={menuIcon} alt='' className={styles.menuIcon} onClick={changeDropdown} />
				{showDropdown && (
					<div className={styles.dropdownWrapper} ref={dropdownMenuRef}>
						<p>Добавить в черновики</p>
						<p onClick={() => setisDeleteTourModalOpen(true)} className={styles.dropdownItemRed}>
							Удалить
						</p>
					</div>
				)}
				<Modal
					isOpen={isDeleteTourModalOpen}
					onRequestClose={() => setisDeleteTourModalOpen(false)}
					className={styles.modal}
				>
					<p>Вы уверены, что хотите удалить тур?</p>
					<div className={styles.deleteTourItems}>
						<p onClick={() => setisDeleteTourModalOpen(false)}>Отмена</p>
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

	const RejectedCard = ({ card }) => (
		<div className={cn(className, styles.card)} {...props}>
			<div className={styles.cardTop}>
				<img src={`/images/${card.img}`} alt='' className={styles.image} />
				<img src={menuIcon} alt='' className={styles.menuIcon} onClick={changeDropdown} />
				{showDropdown && (
					<div className={styles.dropdownWrapper} ref={dropdownMenuRef}>
						<p>Редактировать</p>
						<p>Добавить в черновики</p>
						<p onClick={() => setisDeleteTourModalOpen(true)} className={styles.dropdownItemRed}>
							Удалить
						</p>
					</div>
				)}
				<Modal
					isOpen={isDeleteTourModalOpen}
					onRequestClose={() => setisDeleteTourModalOpen(false)}
					className={styles.modal}
				>
					<p>Вы уверены, что хотите удалить тур?</p>
					<div className={styles.deleteTourItems}>
						<p onClick={() => setisDeleteTourModalOpen(false)}>Отмена</p>
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

	const DraftCard = ({ card }) => (
		<div className={cn(className, styles.card)} {...props}>
			<div className={styles.cardTop}>
				<img src={`/images/${card.img}`} alt='' className={styles.image} />
				<img src={menuIcon} alt='' className={styles.menuIcon} onClick={changeDropdown} />
				{showDropdown && (
					<div className={styles.dropdownWrapper} ref={dropdownMenuRef}>
						<p>Редактировать</p>
						<p onClick={() => setisDeleteTourModalOpen(true)} className={styles.dropdownItemRed}>
							Удалить
						</p>
					</div>
				)}
				<Modal
					isOpen={isDeleteTourModalOpen}
					onRequestClose={() => setisDeleteTourModalOpen(false)}
					className={styles.modal}
				>
					<p>Вы уверены, что хотите удалить тур?</p>
					<div className={styles.deleteTourItems}>
						<p onClick={() => setisDeleteTourModalOpen(false)}>Отмена</p>
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
				<img src={`/images/${card.img}`} alt='' className={styles.image} />
				<img src={menuIcon} alt='' className={styles.menuIcon} onClick={changeDropdown} />
				{showDropdown && (
					<div className={styles.dropdownWrapper} ref={dropdownMenuRef}>
						<p>Редактировать</p>
						<p>Добавить в действующие</p>
						<p onClick={() => setisDeleteTourModalOpen(true)} className={styles.dropdownItemRed}>
							Удалить
						</p>
					</div>
				)}
				<Modal
					isOpen={isDeleteTourModalOpen}
					onRequestClose={() => setisDeleteTourModalOpen(false)}
					className={styles.modal}
				>
					<p>Вы уверены, что хотите удалить тур?</p>
					<div className={styles.deleteTourItems}>
						<p onClick={() => setisDeleteTourModalOpen(false)}>Отмена</p>
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

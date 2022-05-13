import React, { useContext, useState } from 'react'
import cn from 'classnames'
import styles from './Table.module.css'
import { priceRu } from '../../Helpers/helpers'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import { deleteTrip } from '../../Api/Trips'
import { UserContext } from '../../Context/user.context'

export const Table = ({ className, type, data, ...props }) => {
	const [isDeleteTripModalOpen, setIsDeleteTripModalOpen] = useState(false)
	const [deliting, setDeliting] = useState({ loading: false, error: '', success: '' })

	const { user, setUser } = useContext(UserContext)

	const deleteT = async (tourId, tripId) => {
		setDeliting({ ...deliting, loading: true })
		try {
			deleteTrip(tourId, tripId, user.token)
			setDeliting({ ...deliting, loading: false, success: 'Поездка успешно удалена' })
		} catch (e) {
			setDeliting({ ...deliting, loading: false, error: e.message })
		}
	}
	let headers = []

	switch (type) {
		case ('partner', 'tourist'):
			headers = ['Дата', 'Турист', 'Купленный тур', 'Стоимость тура', 'Ваш процент', 'Статус начисления']
			break
		case 'subagent':
			headers = ['Дата', 'Субагент', 'Тур', 'Стоимость тура', 'Ваш процент', 'Статус начисления']
			break
		case 'guide':
			headers = ['Дата', 'Гид', 'Проданный тур', 'Стоимость тура', 'Ваш процент', 'Статус начисления']
			break
		case 'trip':
			headers = ['Дата начала', 'Всего мест', 'Осталось мест', 'Цена', 'Предоплата', 'Цена со скидкой', '', '']
			break
	}


	return (
		<table className={className} {...props}>
			<tbody>
				<tr
					className={cn({
						[styles.tripRow]: type == 'trip',
					})}
				>
					{headers.map((head, index) => (
						<th key={index}>{head}</th>
					))}
				</tr>

				{type !== 'trip'
					? data.map((row, index) => (
							<tr key={index}>
								{Object.values(row).map((cell, index) => (
									<td key={index}>{Number.isInteger(cell) ? priceRu(cell) : cell}</td>
								))}
							</tr>
					  ))
					: data.map((row, index) => (
							<>
								<tr className={styles.tripRow} key={index}>
									<td>{row.date_start}</td>
									<td>{row.places_total}</td>
									<td>{row.places_left}</td>
									<td>{priceRu(row.sum_price)}</td>
									<td>{row?.sum_prepayment && priceRu(row.sum_prepayment)}</td>
									<td>{row?.sum_price_discount && priceRu(row.sum_price_discount)}</td>
									<td className={styles.editTrip}>
										<Link to={`/tour/${row.tour_id}/addTrip/${row.id}`}>Изменить</Link>{' '}
									</td>
									<td onClick={() => setIsDeleteTripModalOpen(true)} className={styles.deleteTrip}>
										Удалить
									</td>
								</tr>
								<Modal
									isOpen={isDeleteTripModalOpen}
									onRequestClose={() => setIsDeleteTripModalOpen(false)}
									className={styles.modal}
								>
									<p>Вы уверены, что хотите удалить тур?</p>
									<div className={styles.deleteTourItems}>
										<p onClick={() => setIsDeleteTripModalOpen(false)}>Отмена</p>
										<p className={styles.dropdownItemRed} onClick={() => deleteT(row.tour_id, row.id)}>
											Удалить
										</p>
									</div>
									{deliting.loading && <Loading />}
									{deliting.error && <p className={styles.error}>{deliting.error}</p>}
									{deliting.success && <p className={styles.success}>{deliting.success}</p>}
								</Modal>
							</>
					  ))}
			</tbody>
		</table>
	)
}

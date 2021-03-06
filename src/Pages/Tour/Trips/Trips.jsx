import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button, Difficulty, Input, Loading, Rating, Table } from '../../../Component'
import { withLayout } from '../../../Layout/Layout'
import cn from 'classnames'
import styles from './Trips.module.css'
import ArrowIcon from './arrow.svg'
import { hashids, priceRu } from '../../../Helpers/helpers'
import { useForm, useFormState, useWatch } from 'react-hook-form'
import { getTrips } from '../../../Api/Trips'
import { UserContext } from '../../../Context/user.context'

const Trips = ({ ...props }) => {
	const [trips, setTrips] = useState(null)

	const { user, setUser } = useContext(UserContext)

	useEffect(() => {
		if (user) {
			;(async () => {
				setTrips(await getTrips(params.id, user.token))
			})()
		}
	}, [user])

	const params = useParams()

	return (
		<div className={styles.trips} {...props}>
			<div className={styles.tripsWrapper}>
				<div className={styles.breadcrumbs}>
					<Link to='/'>Главная</Link> / <Link to={'/guide/tours/' + hashids.encode(user?.profile.id)}>Мои туры</Link> /
					Поездки
				</div>
				<p className={styles.title}>Даты</p>
				{!trips ? <Loading /> : <Table type='trip' data={trips} />}
				<Link to={`/tour/${params.id}/addTrip`}>
					<Button className={styles.button}>Добавить дату</Button>
				</Link>
			</div>
		</div>
	)
}

export default withLayout(Trips)

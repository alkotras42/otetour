import axios from 'axios'
import { API } from '../Helpers/api'

export const getTrips = async (tourId, token) => {
	const res = await axios.get(`https://api.otetour.com/guide/tour/${tourId}/trip`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'content-type': 'application/json',
		},
	})
	return await res.data.data
}

export const getTripById = async (tourId, tripId, token) => {
	const res = await axios.get(`https://api.otetour.com/guide/tour/${tourId}/trip/${tripId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'content-type': 'application/json',
		},
	})
	return await res.data.data
}

export const createTrip = async (data, tourId, token) => {
	return await axios
		.post(
			`https://api.otetour.com/guide/tour/${tourId}/trip`,
			{
				date_start: data.date_start,
				language: data.language,
				places_total: data.places_total,
				places_left: data.places_left,
				sum_price: data.sum_price,
				sum_price_discount: data.sum_price_discount,
				sum_prepayment: data.sum_prepayment,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'content-type': 'application/json',
				},
			}
		)
		.then((res) => {
			return res.data
		})
}

export const updateTrip = async (data, tourId, tripId, token) => {
	return await axios
		.post(
			`https://api.otetour.com/guide/tour/${tourId}/trip/${tripId}`,
			{
				date_start: data.date_start,
				language: data.language,
				places_total: data.places_total,
				places_left: data.places_left,
				sum_price: data.sum_price,
				sum_price_discount: data.sum_price_discount,
				sum_prepayment: data.sum_prepayment,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'content-type': 'application/json',
				},
			}
		)
		.then((res) => {
			return res.data
		})
}

export const deleteTrip = async (tourId, tripId, token) => {
	const res = await axios.delete(`https://api.otetour.com/guide/tour/${tourId}/trip/${tripId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'content-type': 'application/json',
		},
	})
	return res.data.data
}

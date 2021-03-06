import axios from 'axios'
import { API } from '../Helpers/api'

export const createTour = async (data, token) => {
	return await axios
		.post(
			'https://api.otetour.com/guide/tour/',
			{
				currency_id: data.currency_id,
				price: data.price,
				price_discount: data.price_discount,
				price_prepayment: data.price_prepayment,
				country_id: data.country_id,
				region_id: data.region_id,
				city_id: data.city_id,
				region_name: data.region_name,
				city_name: data.city_name,
				accommodation_id: data.accommodation_id,
				category_id: data.category_id,
				length_days: data.length_days,
				difficulty: data.difficulty,
				age_min: data.age_min,
				age_max: data.age_max,
				descriptions: {
					RU: data.ru[0] ? { ...data.ru[0], is_active: '1' } : null,
					EN: data.en[0] ? { ...data.en[0], is_active: '1' } : null,
					FR: data.fr[0] ? { ...data.fr[0], is_active: '1' } : null,
					ES: data.es[0] ? { ...data.es[0], is_active: '1' } : null,
					IT: data.it[0] ? { ...data.it[0], is_active: '1' } : null,
					DE: data.de[0] ? { ...data.de[0], is_active: '1' } : null,
				},
				program: data.program,
				pictures: data.pictures,
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

export const updateTour = async (data, tourId, token) => {
	return await axios
		.post(
			`https://api.otetour.com/guide/tour/${tourId}`,
			{
				country_id: data.country_id,
				region_id: data.region_id,
				city_id: data.city_id,
				category_id: data.category_id,
				length_days: data.length_days,
				difficulty: data.difficulty,
				age_min: data.age_min,
				age_max: data.age_max,
				descriptions: {
					RU: data.ru[0] ? { ...data.ru[0], is_active: '1' } : null,
					EN: data.en[0] ? { ...data.en[0], is_active: '1' } : null,
					FR: data.fr[0] ? { ...data.fr[0], is_active: '1' } : null,
					ES: data.es[0] ? { ...data.es[0], is_active: '1' } : null,
					IT: data.it[0] ? { ...data.it[0], is_active: '1' } : null,
					DE: data.de[0] ? { ...data.de[0], is_active: '1' } : null,
				},
				program: data.program,
				pictures: data.pictures,
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

export const getTours = async (token) => {
	const res = await axios.get(API.tours.get, {
		headers: {
			Authorization: `Bearer ${token}`,
			'content-type': 'application/json',
		},
	})
	return await res.data.data
}

export const getTourById = async (tourId, token) => {
	const res = await axios.get(`${API.tours.get}${tourId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'content-type': 'application/json',
		},
	})
	return await res.data.data
}

export const deleteTour = async (id, token) => {
	const res = await axios.delete(`https://api.otetour.com/guide/tour/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'content-type': 'application/json',
		},
	})
	return res.data.json
}

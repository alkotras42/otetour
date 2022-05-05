import axios from 'axios'
import { API } from '../Helpers/api'

export const getCountries = async () => {
	const res = await axios.get(API.locations.countries.get)
	return await res.data.data
}

export const getRegions = async (countryId) => {
	const res = await axios.get(`${API.locations.countries.get}/${countryId}/region`)
	return await res.data.data
}

export const getCitiesOfRegion = async (countryId, regionId) => {
	const res = await axios.get(`${API.locations.countries.get}/${countryId}/region/${regionId}/city`)
	return await res.data.data
}

export const getCitiesOfCountry = async (countryId) => {
	const res = await axios.get(`${API.locations.countries.get}/${countryId}/city`)
	return await res.data.data
}

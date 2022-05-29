import axios from 'axios'
import { API } from '../Helpers/api'

export const getAccomodations = async () => {
	const res = await axios.get(API.accomodation.get)
	return await res.data.data
}
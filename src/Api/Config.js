import axios from 'axios'
import { API } from '../Helpers/api'

export const getConfig = async () => {
	const res = await axios.get(API.config.get)
	return await res.data
}

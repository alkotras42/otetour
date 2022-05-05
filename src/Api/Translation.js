import axios from 'axios'
import { API } from '../Helpers/api'

export const createTranslation = async (value) => {
	axios.post(
		API.transaction.get,
		{ key: value },
		{
			headers: {
				'content-type': 'application/json',
			},
		}
	)
}

import axios from 'axios'

const URL = 'https://api.otetour.com/'

export const createTranslation = async (value) => {
	axios.post(
		`${URL}translation`,
		{ key: value },
		{
			headers: {
				'content-type': 'application/json',
			},
		}
	)
}

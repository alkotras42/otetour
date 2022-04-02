import axios from 'axios'

const URL = 'https://api.otetour.com/'

export const getConfig = async () => {
	const res = await axios.get(`${URL}config`)
	return await res.data
}

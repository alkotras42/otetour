import axios from 'axios'

const URL = process.env.REACT_APP_API_DOMAIN

export const login = async (email, password) => {
	return await axios
		.post(
			`${URL}/user/login`,
			{ email: email, password: password },
			{
				headers: {
					'content-type': 'application/json',
				},
			}
		)
		.then((res) => {
			if (res.data.code == 200) {
				localStorage.setItem('user', JSON.stringify(res.data))
			}
			return res.data
		})
}

export const registration = async (name, lastName, email, password) => {
	return await axios
		.post(
			`${URL}/user`,
			{ firstname: name, lastname: lastName, email: email, password: password, phone: 12345678 },
			{
				headers: {
					'content-type': 'application/json',
				},
			}
		)
		.then((res) => {
			return res.data
		})
}

export const logout = () => {
	localStorage.removeItem('user')
}

export const getUser = () => {
	// await axios.get(`${URL}/user/profile`, {
	// 	headers: { Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token },
	// }).then((res) => {
	// 	return res.data
	// })

	try {
		return JSON.parse(localStorage.getItem('user')).data.profile
	} catch {
		return null
	}
}

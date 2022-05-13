import axios from 'axios'
import { API } from '../Helpers/api'

export const login = async (email, password) => {
	return await axios
		.post(
			API.user.login,
			{ email: email, password: password, rememberme: true },
			{
				headers: {
					'content-type': 'application/json',
				},
			}
		)
		.then((res) => {
			if (res.data.code == 200) {
				localStorage.setItem('user', JSON.stringify(res.data.data))
			}
			return res.data
		})
}

export const registration = async (name, lastName, email, password) => {
	return await axios
		.post(
			API.user.registration,
			{ firstname: name, lastname: lastName, email: email, password: password },
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
		const user = JSON.parse(localStorage.getItem('user'))
		return { profile: user.profile, token: user.token }
	} catch {
		return { user: null }
	}
}

export const getUserById = async (id) => {
	return await axios.get(`${API.user.byId}/${id}`)
}

export const updateUserInfo = async ({ id, token, name, lastName, email, phone, avatar, password }) => {
	return await axios
		.put(
			`${API.user.byId}/${id}`,
			{
				firstname: name,
				lastname: lastName,
				email: email,
				phone: phone,
				photo: avatar,
				password: password,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'content-type': 'application/json',
				},
			}
		)
		.then((res) => {
			if (res.data.code == 200) {
				let { user, token } = getUser()
				const userData = { profile: { ...user, ...res.data.data }, token: token }
				localStorage.setItem('user', JSON.stringify(userData))
			}
			return res.data
		})
}

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
		const user = JSON.parse(localStorage.getItem('user')).data
		return { user: user.profile, token: user.token }
	} catch {
		return null
	}
}

export const getUserById = async (id) => {
	res = await axios.get(`${URL}/user/${id}`)
	console.log(res)
}

export const updateUserInfo = async ({ id, token, name, lastName, email, phone }) => {
	const res = await axios.put(
		`${URL}/user/${id}`,
		{
			firstname: name,
			lastname: lastName,
			email: email,
			phone: phone,
		},
		{
			headers: {
				Authorization: `Bearer ${token}`,
				'content-type': 'application/json',
			},
		}
	)

	console.log(res)
}

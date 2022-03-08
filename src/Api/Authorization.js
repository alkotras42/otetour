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

export const logout = () => {
	localStorage.removeItem('user')
}

export const getUser = () => {
	axios.get(`${URL}/user/profile`).then((res) => console.log(res))
}

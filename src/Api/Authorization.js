import axios from 'axios'

const URL = process.env.REACT_APP_API_DOMAIN

export const login = (email, password) => {
	axios.post(`${URL}/user/login`, { email, password }).then((res) => console.log(res.data))
}

const URL = 'https://api.otetour.com' // process.env.REACT_APP_API_DOMAIN

export const API = {
	user: {
		login: `${URL}/user/login`,
		registration: `${URL}/user`,
		byId: `${URL}/user`,
	},
	config: {
		get: `${URL}/config`,
	},
	transaction: {
		get: `${URL}/translation`,
	},
}

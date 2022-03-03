import * as Yup from 'yup'

export const ValidationSchema = Yup.object({
	email: Yup.string().email('Неверный email адрес').required('Необходимо ввести email'),
	password: Yup.string()
		.min(6, 'Пароль должен быть длиннее 6 символов')
		.max(15, 'Пароль должен быть короче 15 символов')
		.required('Необходимо ввести пароль'),
	passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
})

export const priceRu = (price) =>
	price
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
		.concat(' ₽')

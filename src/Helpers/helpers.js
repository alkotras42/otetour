import * as Yup from 'yup'

export const RegistrationSchema = Yup.object({
	name: Yup.string().required('Необходимо ввести имя'),
	lastName: Yup.string().required('Необходимо ввести фамилию'),
	email: Yup.string().email('Неверный email адрес').required('Необходимо ввести email'),
	password: Yup.string()
		.min(6, 'Пароль должен быть длиннее 6 символов')
		.max(15, 'Пароль должен быть короче 15 символов')
		.required('Необходимо ввести пароль'),
	passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
})

export const LoginSchema = Yup.object({
	email: Yup.string().email('Неверный email адрес').required('Необходимо ввести email'),
	password: Yup.string()
		.min(6, 'Пароль должен быть длиннее 6 символов')
		.max(15, 'Пароль должен быть короче 15 символов')
		.required('Необходимо ввести пароль'),
})

export const ChangePasswordSchema = Yup.object({
	email: Yup.string().email('Неверный email адрес').required('Необходимо ввести email'),
})

export const ChangePasswordConfirmSchema = Yup.object({
	key: Yup.string().required('Введите код подтверждения'),
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

export const toPhone = (number) => {
	const match = number.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
	if (match) {
		return '+7 (' + match[1] + ') ' + match[2] + '-' + match[3] + '-' + match[4]
	}
	return null
}

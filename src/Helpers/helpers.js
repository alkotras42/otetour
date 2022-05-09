import * as Yup from 'yup'
import Hashids from 'hashids'

export const hashids = new Hashids(process.env.REACT_APP_HASHIDS_KEY, 11)

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

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

export const PersonalInfoSchema = Yup.object({
	name: Yup.string().required('Необходимо ввести имя'),
	lastName: Yup.string().required('Необходимо ввести фамилию'),
	email: Yup.string().email('Неверный email адрес').required('Необходимо ввести email'),
	phone: Yup.string().required('Введите номер телефона').matches(phoneRegExp, 'Введите подходящий номер телефона'),
})

export const PersonalDescriptionSchema = Yup.object({
	description: Yup.string().required('Введите описание'),
})

export const PersonalPassportInfoSchema = Yup.object({
	passport: Yup.string()
		.required('Введите серию и номер паспорта')
		.matches(/\d{4}\s\d{6}/, 'Серия и номер должны быть в формате 0123 456789'),
	passportWhen: Yup.string().required('Введите когда был выдан паспорт'),
	passportWho: Yup.string().required('Введите кем был выдан паспорт'),
})

export const PersonalRequisitesSchema = Yup.object({
	requisitesPerson: Yup.string().required('Введите ФИО'),
	requisitesBill: Yup.number().typeError('Счет должен быть числом').required('Введите номер счета'),
})

export const PersonalPasswordSchema = Yup.object({
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
	if (number) {
		const match = number.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/)
		if (match) {
			return '+7 (' + match[1] + ') ' + match[2] + '-' + match[3] + '-' + match[4]
		}
	}

	return null
}

export const imageFilter = (image) => {
	const response = { message: '', ok: false }
	if (image.size > 5e6) {
		response.message = 'Изображение не должно превышать 5Мб'
	} else if (image.type.toString() !== ('image/jpeg' || 'image/png')) {
		response.message = 'Неверный тип файла, выберите изображение формата png, jpg или jpeg'
	} else {
		response.ok = true
	}

	return response
}

import * as Yup from 'yup'
import Hashids from 'hashids'

export const hashids = new Hashids(process.env.REACT_APP_HASHIDS_KEY, 11)

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const RegistrationSchema = Yup.object({
	name: Yup.string().required('Необходимо ввести имя').max(50, 'Имя не должно быть длинее 50 символов'),
	lastName: Yup.string().required('Необходимо ввести фамилию').max(50, 'Фамилия не должна быть длинее 50 символов'),
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
	firstname: Yup.string().required('Необходимо ввести имя').max(50, 'Имя не должно быть длинее 50 символов'),
	lastname: Yup.string().required('Необходимо ввести фамилию').max(50, 'Фамилия не должна быть длинее 50 символов'),
	email: Yup.string().email('Неверный email адрес').required('Необходимо ввести email'),
	phone: Yup.string().required('Введите номер телефона').matches(phoneRegExp, 'Введите подходящий номер телефона'),
})

export const PersonalDescriptionSchema = Yup.object({
	guide_about: Yup.string().required('Введите описание'),
})

export const PersonalPassportInfoSchema = Yup.object({
	pass_nr: Yup.string()
		.required('Введите серию и номер паспорта')
		.matches(/\d{4}\s\d{6}/, 'Серия и номер должны быть в формате 0123 456789'),
	pass_date: Yup.string().required('Введите когда был выдан паспорт'),
	pass_issuer: Yup.string().required('Введите кем был выдан паспорт'),
})

export const PersonalRequisitesSchema = Yup.object({
	requisite_name: Yup.string().required('Введите ФИО'),
	requisite_account: Yup.number().typeError('Счет должен быть числом').required('Введите номер счета'),
	requisite_bank: Yup.string().required('Введите название банка'), 
	requisite_inn: Yup.string().required('Введите ИНН'),
	requisite_bik: Yup.string().required('Введите БИК'),
	requisite_corr: Yup.string().required('Введите корр. счет'),
	requisite_swift: Yup.string().required('Введите SWIFT-код'),
})

export const PersonalLicensSchema = Yup.object({
	license_nr: Yup.string().required('Введите номер лицензии'),
})

export const PersonalCompanySchema = Yup.object({
	company_name: Yup.string().required('Введите название компании').max(200, 'Название компании не должно превышать 200 символов'),
	company_nr: Yup.string().required('Введите номер компании').max(200, 'Номер компании не должен превышать 200 символов'),
	company_type_id: Yup.string().required('Введите тип компании'),
})

export const PersonalPasswordSchema = Yup.object({
	password: Yup.string()
		.min(6, 'Пароль должен быть длиннее 6 символов')
		.max(15, 'Пароль должен быть короче 15 символов')
		.required('Необходимо ввести пароль'),
	passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
})

export const priceRu = (price, suffix = '₽') =>
	price
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
		.concat(' ' + suffix)

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
	} else if (image.type.toString() !== 'image/jpeg' && image.type.toString() !== 'image/png') {
		response.message = 'Неверный тип файла, выберите изображение формата png, jpg или jpeg'
	} else {
		response.ok = true
	}

	return response
}

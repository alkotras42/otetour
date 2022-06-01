import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import { getUser, updateUserInfo } from '../../../../Api/Authorization'
import cameraIcon from './camera.svg'
import telegramIcon from './telegram.svg'
import whatsappIcon from './whatsapp.svg'
import { withLayout } from '../../../../Layout/Layout'
import styles from './GuideProfileEdit.module.css'
import { Button, CustomSelect, Input, InputWithMask, TextArea } from '../../../../Component'
import {
	hashids,
	imageFilter,
	PersonalCompanySchema,
	PersonalDescriptionSchema,
	PersonalInfoSchema,
	PersonalLicensSchema,
	PersonalPassportInfoSchema,
	PersonalPasswordSchema,
	PersonalRequisitesSchema,
} from '../../../../Helpers/helpers'
import Modal from 'react-modal'
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import { UserContext } from '../../../../Context/user.context'
import ClipLoader from 'react-spinners/ClipLoader'

const GuideProfileEdit = () => {
	const { user, setUser } = useContext(UserContext)

	const [value, setValue] = useState({
		id: '',
		firstname: '',
		lastname: '',
		email: '',
		phone: '',
		description: '',
		pass_nr: '',
		pass_date: '',
		pass_issuer: '',
		requisite_name: '',
		requisite_account: '',
		requisite_bank: '',
		requisite_inn: '',
		requisite_bik: '',
		requisite_corr: '',
		requisite_swift: '',
		company_name: '',
		company_nr: '',
		company_type_id: '',
		license_nr: '',
		password: '',
		passwordConfirm: '',
		photo: '',
	})

	const [companyTypes, setCompanyTypes] = useState(null)

	useEffect(() => {
		setCompanyTypes(JSON.parse(localStorage.getItem('config')).company_types)
	}, [])

	useEffect(() => {
		if (user) {
			setValue({ ...user.profile })
		}
	}, [user])

	const avatarRef = useRef()

	const [avatarEdit, setAvatarEdit] = useState({
		image: '',
		scale: 1,
	})

	const [modalIsOpen, setModalOpen] = useState(false)

	const [error, setError] = useState({
		personalInfoError: null,
		passwordError: null,
		avatarError: null,
		descriptionError: null,
		passportDataError: null,
		requisitesError: null,
		licenseError: null,
		companyError: null,
	})

	const [success, setSuccess] = useState({
		personalInfoSuccess: null,
		passwordSuccess: null,
		avatarSuccess: null,
		descriptionSuccess: null,
		passportDataSuccess: null,
		requisitesSuccess: null,
		licenseSuccess: null,
		companySuccess: null,
	})

	const [loading, setLoading] = useState({
		personalInfoLoading: false,
		passwordLoading: false,
		avatarLoading: false,
		descriptionLoading: false,
		passportDataLoading: false,
		requisitesLoading: false,
		licenseLoading: false,
		companyLoading: false,
	})

	const handleChange = (e) => {
		setValue({
			...value,
			[e.target.name]: e.target.value,
		})
	}

	const handleDrop = (dropped) => {
		const response = imageFilter(dropped[0])
		if (response.ok) {
			setAvatarEdit({ ...avatarEdit, image: dropped[0] })
		} else {
			setError({ avatarError: response.message })
		}
	}

	const hanldeScale = (e) => {
		setAvatarEdit({ ...avatarEdit, scale: Number(e.target.value) })
	}

	const saveAvatar = () => {
		const img = avatarRef.current.getImage().toDataURL()
		setValue({ ...value, photo: img })
		setAvatarEdit({ ...avatarEdit, image: null })
		setModalOpen(false)
	}

	const closeModal = () => {
		setModalOpen(false)
		setError({ ...error, avatarError: null })
		setAvatarEdit({ ...avatarEdit, image: null })
	}

	const editPersonal = () => {
		setLoading({ personalInfoLoading: true })
		PersonalInfoSchema.validate({
			firstname: value.firstname,
			lastname: value.lastname,
			email: value.email,
			phone: value.phone,
		})
			.then((res) => {
				setError({ ...error, personalInfoError: null })
				updateUserInfo(value.id, user.token, {
					firstname: value.firstname,
					lastname: value.lastname,
					email: value.email,
					phone: value.phone,
					photo: value.photo,
				}).then((res) => {
					if (res.code == 200) {
						setSuccess({ personalInfoSuccess: 'Данные профиля успешно обновлены' })
					} else {
						setError({ ...error, personalInfoError: 'Что-то пошло не так' })
					}
					setLoading({ personalInfoLoading: false })
				})
			})
			.catch((e) => {
				setError({ ...error, personalInfoError: e.message })
				setLoading({ personalInfoLoading: false })
			})
	}

	const editPassword = () => {
		setLoading({ passwordLoading: true })
		PersonalPasswordSchema.validate({ password: value.password, passwordConfirm: value.passwordConfirm })
			.then((res) => {
				setError({ ...error, passwordError: null })
				updateUserInfo(value.id, user.token, { password: res.password }).then((res) => {
					if (res.code == 200) {
						setSuccess({ passwordSuccess: 'Пароль успешно изменен' })
					} else {
						setError({ passwordError: 'Что-то пошло не так' })
					}
					setLoading({ passwordLoading: false })
				})
			})
			.catch((e) => {
				setError({ ...error, passwordError: e.message })
				setLoading({ passwordLoading: false })
			})
	}

	const editDescription = () => {
		setLoading({ descriptionLoading: true })
		PersonalDescriptionSchema.validate({ guide_about: value.guide_about })
			.then((res) => {
				setError({ ...error, descriptionError: null })
				updateUserInfo(value.id, user.token, { guide_about: value.guide_about }).then((res) => {
					if (res.code == 200) {
						setSuccess({ descriptionSuccess: 'Описание успешно изменено' })
					} else {
						setError({ descriptionError: 'Что-то пошло не так' })
					}
				})
				setLoading({ descriptionLoading: false })
			})
			.catch((e) => {
				setError({ ...error, descriptionError: e.message })
				setLoading({ descriptionLoading: false })
			})
	}

	const editPassportData = () => {
		setLoading({ passportDataLoading: true })
		PersonalPassportInfoSchema.validate({
			pass_nr: value.pass_nr,
			pass_date: value.pass_date,
			pass_issuer: value.pass_issuer,
		})
			.then((res) => {
				setError({ ...error, passportDataError: null })
				updateUserInfo(value.id, user.token, { ...res }).then((res) => {
					if (res.code == 200) {
						setSuccess({ passportDataSuccess: 'Паспортные данные успешно изменены' })
					} else {
						setError({ passportDataError: 'Что-то пошло не так' })
					}
				})
				setLoading({ passportDataLoading: false })
			})
			.catch((e) => {
				setError({ ...error, passportDataError: e.message })
				setLoading({ passportDataLoading: false })
			})
	}

	const editRequisites = () => {
		setLoading({ requisitesLoading: true })
		PersonalRequisitesSchema.validate({
			requisite_name: value.requisite_name,
			requisite_account: value.requisite_account,
			requisite_bank: value.requisite_bank,
			requisite_inn: value.requisite_inn,
			requisite_bik: value.requisite_bik,
			requisite_corr: value.requisite_corr,
			requisite_swift: value.requisite_swift,
		})
			.then((res) => {
				setError({ ...error, requisitesError: null })

				updateUserInfo(value.id, user.token, { ...res }).then((res) => {
					if (res.code == 200) {
						setSuccess({ requisitesSuccess: 'Реквизиты успешно изменены' })
					} else {
						setError({ requisitesError: 'Что-то пошло не так' })
					}
				})

				setLoading({ requisitesLoading: false })
			})
			.catch((e) => {
				setError({ ...error, requisitesError: e.message })
				setLoading({ requisitesLoading: false })
			})
	}

	const editLicense = () => {
		setLoading({ licenseLoading: true })
		PersonalLicensSchema.validate({ license_nr: value.license_nr })
			.then((res) => {
				setError({ ...error, descriptionError: null })
				updateUserInfo(value.id, user.token, { ...res }).then((res) => {
					if (res.code == 200) {
						setSuccess({ licenseSuccess: 'Лицензия успешно изменена' })
					} else {
						setError({ licenseError: 'Что-то пошло не так' })
					}
				})
				setLoading({ licenseLoading: false })
			})
			.catch((e) => {
				setError({ ...error, licenseError: e.message })
				setLoading({ licenseLoading: false })
			})
	}

	const editCompany = () => {
		setLoading({ companyLoading: true })
		PersonalCompanySchema.validate({
			company_name: value.company_name,
			company_nr: value.company_nr,
			company_type_id: value.company_type_id,
		})
			.then((res) => {
				setError({ ...error, descriptionError: null })
				updateUserInfo(value.id, user.token, { ...res }).then((res) => {
					if (res.code == 200) {
						setSuccess({ companySuccess: 'Данные компании успешно изменены' })
						setError({ companyError: null })
					} else {
						setError({ companyError: 'Что-то пошло не так' })
					}
				})
				setLoading({ companyLoading: false })
			})
			.catch((e) => {
				setError({ ...error, companyError: e.message })
				setLoading({ companyLoading: false })
			})
	}

	return (
		<div className={styles.profile}>
			<div className={styles.profileWrapper}>
				{user ? (
					<>
						<div className={styles.breadcrumbs}>
							<Link to='/'>Главная</Link> / <Link to={'/guide/' + hashids.encode(value.id)}>Личный кабинет</Link> /
							Редактировать профиль
						</div>
						<p className={styles.title}>Редактировать профиль</p>
						<div className={styles.changeImg}>
							<Modal isOpen={modalIsOpen} onRequestClose={closeModal} className={styles.modal}>
								{avatarEdit.image ? (
									<div>
										<AvatarEditor
											ref={avatarRef}
											image={avatarEdit.image}
											width={300}
											height={300}
											scale={avatarEdit.scale}
											borderRadius={300}
											className={styles.avatarEditor}
										/>
										<input
											type='range'
											step='0.01'
											min='1'
											max='5'
											value={avatarEdit.scale}
											name='scale'
											onChange={hanldeScale}
											className={styles.range}
										/>
										<Button onClick={saveAvatar} className={styles.avatarSubmitButton}>
											Загрузить
										</Button>
									</div>
								) : (
									<>
										{error.avatarError && <p className={styles.error}>{error.avatarError}</p>}
										<Dropzone onDrop={handleDrop}>
											{({ getRootProps, getInputProps }) => (
												<div {...getRootProps({ className: styles.dropzone })}>
													<div>
														<input {...getInputProps()} />
														<p>Перетащите изобращение сюда или нажмите чтобы выбрать.</p>
													</div>
												</div>
											)}
										</Dropzone>
									</>
								)}
							</Modal>

							<img src={value.photo} alt='' className={styles.profileImg} />
							<div className={styles.chooseImg} onClick={() => setModalOpen(true)}>
								<img src={cameraIcon} alt='' className={styles.cameraImg} />
							</div>
						</div>
						<div className={styles.editProfile}>
							<p className={styles.editProfileTitle}>Личная информация</p>
							<Input onChange={handleChange} value={value.firstname} name='firstname' placeholder='Имя' />
							<Input onChange={handleChange} value={value.lastname} name='lastname' placeholder='Фамилия' />
							<Input onChange={handleChange} value={value.email} name='email' placeholder='Email' />
							<InputWithMask format="+7 (###) ###-####" mask="_" onChange={handleChange} value={value.phone} name='phone' placeholder='Телефон' />
							{error.personalInfoError && <p className={styles.error}>{error.personalInfoError}</p>}
							{success.personalInfoSuccess && <p className={styles.success}>{success.personalInfoSuccess}</p>}

							<Button onClick={editPersonal} className={styles.button}>
								{loading.personalInfoLoading ? <ClipLoader color='#fff' /> : 'Сохранить'}
							</Button>
							<p className={styles.editProfileTitle}>Описание</p>
							<p>
								Описание будет отображаться рядом с вашим именем на странице тура. Расскажите подробнее о себе, о своем опыте.
							</p>
							<TextArea onChange={handleChange} value={value.guide_about} placeholder='Описание' name='guide_about' />
							<Button onClick={editDescription} className={styles.button}>
								{loading.descriptionLoading ? <ClipLoader color='#fff' /> : 'Сохранить'}
							</Button>
							{error.descriptionError && <p className={styles.error}>{error.descriptionError}</p>}
							{success.descriptionSuccess && <p className={styles.success}>{success.descriptionSuccess}</p>}
							<p className={styles.editProfileTitle}>Паспортные данные</p>
							<InputWithMask format="#### ######" mask="_" onChange={handleChange} value={value.pass_nr} name='pass_nr' placeholder='Серия и номер паспорта' />
							<Input onChange={handleChange} value={value.pass_date} name='pass_date' placeholder='Когда выдан' />
							<Input onChange={handleChange} value={value.pass_issuer} name='pass_issuer' placeholder='Кем выдан' />
							<Button onClick={editPassportData} className={styles.button}>
								{loading.passportDataLoading ? <ClipLoader color='#fff' /> : 'Сохранить'}
							</Button>
							{error.passportDataError && <p className={styles.error}>{error.passportDataError}</p>}
							{success.passportDataSuccess && <p className={styles.success}>{success.passportDataSuccess}</p>}
							<p className={styles.editProfileTitle}>Реквизиты</p>
							<Input onChange={handleChange} value={value.requisite_name} name='requisite_name' placeholder='ФИО получателя' />
							<Input
								onChange={handleChange}
								value={value.requisite_account}
								name='requisite_account'
								placeholder='Счет получателя'
							/>
							<Input
								onChange={handleChange}
								value={value.requisite_bank}
								name='requisite_bank'
								placeholder='Банк Получателя (полное название банка)'
							/>
							<Input onChange={handleChange} value={value.requisite_inn} name='requisite_inn' placeholder='ИНН' />
							<Input onChange={handleChange} value={value.requisite_bik} name='requisite_bik' placeholder='БИК' />
							<Input onChange={handleChange} value={value.requisite_corr} name='requisite_corr' placeholder='Корр. счет' />
							<Input onChange={handleChange} value={value.requisite_swift} name='requisite_swift' placeholder='SWIFT-код' />
							<Button onClick={editRequisites} className={styles.button}>
								{loading.requisitesLoading ? <ClipLoader color='#fff' /> : 'Сохранить'}
							</Button>
							{error.requisitesError && <p className={styles.error}>{error.requisitesError}</p>}
							{success.requisitesSuccess && <p className={styles.success}>{success.requisitesSuccess}</p>}
							<p className={styles.editProfileTitle}>Компания</p>
							<Input onChange={handleChange} value={value.company_name} name='company_name' placeholder='Название компании' />
							<Input
								onChange={handleChange}
								value={value.company_nr}
								name='company_nr'
								placeholder='Регистрационный номер компании'
							/>
							<CustomSelect
								onChange={handleChange}
								value={value.company_type_id}
								filled={value.company_type_id}
								options={companyTypes}
								name='company_type_id'
								placeholder='Тип компании'
							/>
							<Button onClick={editCompany} className={styles.button}>
								{loading.companyLoading ? <ClipLoader color='#fff' /> : 'Сохранить'}
							</Button>
							{error.companyError && <p className={styles.error}>{error.companyError}</p>}
							{success.companySuccess && <p className={styles.success}>{success.companySuccess}</p>}
							<p className={styles.editProfileTitle}>Лицензия</p>
							<Input onChange={handleChange} value={value.license_nr} name='license_nr' placeholder='Номер лецензии' />
							<p className={styles.pickLicens}>Выбрать файл</p>
							<Button onClick={editLicense} className={styles.button}>
								{loading.licenseLoading ? <ClipLoader color='#fff' /> : 'Сохранить'}
							</Button>
							{error.licenseError && <p className={styles.error}>{error.licenseError}</p>}
							{success.licenseSuccess && <p className={styles.success}>{success.licenseSuccess}</p>}
							<p className={styles.editProfileTitle}>Сменить пароль</p>
							<Input
								onChange={handleChange}
								value={value.password}
								type='password'
								name='password'
								placeholder='Новый пароль'
							/>
							<Input
								onChange={handleChange}
								value={value.passwordConfirm}
								type='password'
								name='passwordConfirm'
								placeholder='Подтверждение пароля'
							/>
							{error.passwordError && <p className={styles.error}>{error.passwordError}</p>}
							{success.passwordSuccess && <p className={styles.success}>{success.passwordSuccess}</p>}

							<Button onClick={editPassword} className={styles.button}>
								{loading.passwordLoading ? <ClipLoader color='#fff' /> : 'Сохранить'}
							</Button>
						</div>
					</>
				) : (
					<div>Loading...</div>
				)}
			</div>
		</div>
	)
}

export default withLayout(GuideProfileEdit)

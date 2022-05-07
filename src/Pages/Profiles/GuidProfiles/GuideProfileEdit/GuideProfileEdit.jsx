import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import { getUser, updateUserInfo } from '../../../../Api/Authorization'
import cameraIcon from './camera.svg'
import telegramIcon from './telegram.svg'
import whatsappIcon from './whatsapp.svg'
import { withLayout } from '../../../../Layout/Layout'
import styles from './GuideProfileEdit.module.css'
import { Button, Input, TextArea } from '../../../../Component'
import { hashids, imageFilter, PersonalInfoSchema, PersonalPasswordSchema } from '../../../../Helpers/helpers'
import Modal from 'react-modal'
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import { UserContext } from '../../../../Context/user.context'
import ClipLoader from 'react-spinners/ClipLoader'

const GuideProfileEdit = () => {
	const { user, setUser } = useContext(UserContext)

	const [value, setValue] = useState({
		id: '',
		name: '',
		lastName: '',
		email: '',
		phone: '',
		description: '',
		passport: '',
		passportWhen: '',
		passportWho: '',
		requisitesPerson: '',
		requisitesBill: '',
		password: '',
		passwordConfirm: '',
		avatar: '',
	})

	useEffect(() => {
		if (user) {
			setValue({
				id: user.profile.id || '',
				name: user.profile.firstname || '',
				lastName: user.profile.lastname || '',
				email: user.profile.email || '',
				phone: user.profile.phone || '',
				password: '',
				passwordConfirm: '',
				avatar: user.profile.photo || '',
			})
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
	})

	const [success, setSuccess] = useState({
		personalInfoSuccess: null,
		passwordSuccess: null,
		avatarSuccess: null,
	})

	const [loading, setLoading] = useState({
		personalInfoLoading: false,
		passwordLoading: false,
		avatarLoading: false,
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
		setValue({ ...value, avatar: img })
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
		PersonalInfoSchema.validate({ name: value.name, lastName: value.lastName, email: value.email, phone: value.phone })
			.then((res) => {
				setError({ personalInfoError: null })
				updateUserInfo({
					id: value.id,
					token: user.token,
					name: value.name,
					lastName: value.lastName,
					email: value.email,
					phone: value.phone,
					avatar: value.avatar,
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
				setError({ passwordError: null })
				updateUserInfo({ id: value.id, token: user.token, password: res.password }).then((res) => {
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

	return (
		<div className={styles.profile}>
			<div className={styles.profileWrapper}>
				{user ? (
					<>
						<div className={styles.breadcrumbs}>
							<Link to='/'>Главная</Link> / <Link to={'/user/' + hashids.encode(value.id)}>Личный кабинет</Link> /
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

							<img src={value.avatar} alt='' className={styles.profileImg} />
							<div className={styles.chooseImg} onClick={() => setModalOpen(true)}>
								<img src={cameraIcon} alt='' className={styles.cameraImg} />
							</div>
						</div>
						<div className={styles.editProfile}>
							<p className={styles.editProfileTitle}>Личная информация</p>
							<Input onChange={handleChange} value={value.name} name='name' placeholder='Имя' />
							<Input onChange={handleChange} value={value.lastName} name='lastName' placeholder='Фамилия' />
							<Input onChange={handleChange} value={value.email} name='email' placeholder='Email' />
							<Input onChange={handleChange} value={value.phone} name='phone' placeholder='Телефон' />
							{error.personalInfoError && <p className={styles.error}>{error.personalInfoError}</p>}
							{success.personalInfoSuccess && <p className={styles.success}>{success.personalInfoSuccess}</p>}

							<Button onClick={editPersonal} className={styles.button}>
								{loading.personalInfoLoading ? <ClipLoader color='#fff' /> : 'Сохранить'}
							</Button>
							<p className={styles.editProfileTitle}>Описание</p>
							<p>
								Описание будет отображаться рядом с вашим именем на странице тура. Расскажите подробнее о себе, о своем опыте.
							</p>
							<TextArea onChange={handleChange} value={value.description} placeholder='Описание' name='description' />
							<Button className={styles.button}>
								{loading.personalInfoLoading ? <ClipLoader color='#fff' /> : 'Сохранить'}
							</Button>
							<p className={styles.editProfileTitle}>Паспортные данные</p>
							<Input onChange={handleChange} value={value.passport} name='passport' placeholder='Серия и номер паспорта' />
							<Input onChange={handleChange} value={value.passportWhen} name='passportWhen' placeholder='Когда выдан' />
							<Input onChange={handleChange} value={value.passportWho} name='passportWho' placeholder='Кем выдан' />
							<Button className={styles.button}>
								{loading.personalInfoLoading ? <ClipLoader color='#fff' /> : 'Сохранить'}
							</Button>
							<p className={styles.editProfileTitle}>Реквизиты</p>
							<Input
								onChange={handleChange}
								value={value.requisitesPerson}
								name='requisitesPerson'
								placeholder='ФИО получателя'
							/>
							<Input
								onChange={handleChange}
								value={value.requisitesBill}
								name='requisitesBill'
								placeholder='Счет получателя'
							/>
							<Button className={styles.button}>
								{loading.personalInfoLoading ? <ClipLoader color='#fff' /> : 'Сохранить'}
							</Button>
							<p className={styles.editProfileTitle}>Лицензия</p>
							<p className={styles.pickLicens}>Выбрать файл</p>
							<Button className={styles.button}>
								{loading.personalInfoLoading ? <ClipLoader color='#fff' /> : 'Сохранить'}
							</Button>
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

import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { getUser, updateUserInfo } from '../../../../Api/Authorization'
import cameraIcon from './camera.svg'
import telegramIcon from './telegram.svg'
import whatsappIcon from './whatsapp.svg'
import { withLayout } from '../../../../Layout/Layout'
import styles from './ProfileEdit.module.css'
import { Button, Input } from '../../../../Component'
import { PersonalInfoSchema, PersonalPasswordSchema } from '../../../../Helpers/helpers'
import Modal from 'react-modal'
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'

const ProfileEdit = () => {
	const {user, token} = getUser()

	console.log(user)

	const [value, setValue] = useState({
		name: user.firstname || '',
		lastName: user.lastname || '',
		email: user.email || '',
		phone: user.phone || '',
		password: '',
		passwordConfirm: '',
		avatar: user.photo || '',
	})

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

	const handleChange = (e) => {
		setValue({
			...value,
			[e.target.name]: e.target.value,
		})
	}

	const handleDrop = (dropped) => {
		if (dropped[0].size > 5e6) {
			setError({ avatarError: 'Изображение не должно превышать 5Мб' })
		} else if (dropped[0].type.toString() !== ('image/jpeg' || 'image/png')) {
			setError({ avatarError: 'Неверный тип файла, выберите изображение формата png, jpg или jpeg' })
		} else {
			setAvatarEdit({ ...avatarEdit, image: dropped[0] })
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
		PersonalInfoSchema.validate({ name: value.name, lastName: value.lastName, email: value.email, phone: value.phone })
			.then((res) => {
				setError({ personalInfoError: null })
				updateUserInfo({ id: user.id, token: token, name: value.name, lastName: value.lastName, email: value.email, phone: value.phone })
			})
			.catch((e) => setError({ ...error, personalInfoError: e.message }))
	}

	const editPassword = () => {
		PersonalPasswordSchema.validate({ password: value.password, passwordConfirm: value.passwordConfirm })
			.then((res) => {
				setError({ passwordError: null })
				console.log(res)
			})
			.catch((e) => setError({ ...error, passwordError: e.message }))
	}

	return (
		<div className={styles.profile}>
			<div className={styles.profileWrapper}>
				<div className={styles.breadcrumbs}>
					<Link to='/'>Главная</Link> / <Link to={'/user/' + getUser().id}>Личный кабинет</Link> / Редактировать профиль
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
					<Button onClick={editPersonal} className={styles.button}>
						Сохранить
					</Button>
					<p className={styles.editProfileTitle}>Сменить пароль</p>
					<Input onChange={handleChange} value={value.password} type='password' name='password' placeholder='Новый пароль' />
					<Input
						onChange={handleChange}
						value={value.passwordConfirm}
						type='password'
						name='passwordConfirm'
						placeholder='Подтверждение пароля'
					/>
					{error.passwordError && <p className={styles.error}>{error.passwordError}</p>}

					<Button onClick={editPassword} className={styles.button}>
						Сохранить
					</Button>

					<p className={styles.editProfileTitle}>Уведомления</p>
					<p className={styles.editProfileText}>
						Выберите удобный способ получения уведомлений о новых сообщениях и других событиях.
					</p>
					<div className={styles.socials}>
						<img src={telegramIcon} alt='' className={styles.disable} />
						<img src={whatsappIcon} alt='' />
					</div>
					<Button className={styles.button}>Сохранить</Button>
				</div>
			</div>
		</div>
	)
}

export default withLayout(ProfileEdit)

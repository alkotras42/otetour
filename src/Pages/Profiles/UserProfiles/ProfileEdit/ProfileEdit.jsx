import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getUser } from '../../../../Api/Authorization'
import cameraIcon from './camera.svg'
import telegramIcon from './telegram.svg'
import whatsappIcon from './whatsapp.svg'
import { withLayout } from '../../../../Layout/Layout'
import styles from './ProfileEdit.module.css'
import { Button, Input } from '../../../../Component'
import { PersonalInfoSchema, PersonalPasswordSchema } from '../../../../Helpers/helpers'

const ProfileEdit = () => {
	const [value, setValue] = useState({
		name: '',
		lastName: '',
		email: '',
		phone: '',
		password: '',
		passwordConfirm: '',
	})

	const [error, setError] = useState({
		personalInfoError: null,
		passwordError: null,
	})

	const handleChange = (e) => {
		setValue({
			...value,
			[e.target.name]: e.target.value,
		})
	}

	const editPersonal = () => {
		PersonalInfoSchema.validate({ name: value.name, lastName: value.lastName, email: value.email, phone: value.phone })
			.then((res) => {
				setError({ personalInfoError: null })
				console.log(res)
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
					<img src='/images/profileImg1.png' alt='' className={styles.profileImg} />
					<div className={styles.chooseImg}>
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

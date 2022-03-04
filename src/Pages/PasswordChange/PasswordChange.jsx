import React, { useState } from 'react'
import { Button, Input } from '../../Component'
import { ChangePasswordConfirmSchema, ChangePasswordSchema } from '../../Helpers/helpers'
import { Header } from '../../Layout/Header/Header'
import cn from 'classnames'
import styles from './PasswordChange.module.css'

export const PasswordChange = () => {
	const [user, setUser] = useState({
		email: '',
		key: '',
		password: '',
		passwordConfirm: '',
	})

	const [confirm, setConfirm] = useState(false)

	const [changePasswordError, setChangePasswordError] = useState()

	const handleChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		})
	}

	const changePassword = () => {
		ChangePasswordSchema.validate(user)
			.then((res) => {
				setChangePasswordError(null)
				setConfirm(true)
				// login(res)
			})
			.catch((error) => setChangePasswordError(error.message))
	}

	const changePasswordConfirm = () => {
		ChangePasswordConfirmSchema.validate(user)
			.then((res) => {
				setChangePasswordError(null)
				// login(res)
			})
			.catch((error) => setChangePasswordError(error.message))
	}

	return (
		<>
			<Header />
			<div className={styles.changePassword}>
				<div
					className={cn(styles.changePasswordWrapper, {
						[styles.hide]: confirm,
					})}
				>
					<p className={styles.title}>Смена пароля</p>
					<p>Введите адрес электронной почты, связанный с вашим аккаунтом, и мы вышлем вам код для смены пароля.</p>
					{changePasswordError && <p className={styles.error}>{changePasswordError}</p>}
					<Input placeholder='Email' name='email' value={user.email} onChange={handleChange} />
					<Button onClick={changePassword} className={styles.button}>
						Отправить
					</Button>
				</div>
				<div
					className={cn(styles.changePasswordWrapper, {
						[styles.hide]: !confirm,
					})}
				>
					<p className={styles.title}>Смена пароля</p>
					<p>Введите код и новый пароль для вашего аккаунта.</p>
					{changePasswordError && <p className={styles.error}>{changePasswordError}</p>}
					<Input placeholder='Код' name='key' value={user.key} onChange={handleChange} />
					<Input placeholder='Пароль' type='password' name='password' value={user.password} onChange={handleChange} />
					<Input
						placeholder='Подтверждение пароля'
						type='password'
						name='passwordConfirm'
						value={user.passwordConfirm}
						onChange={handleChange}
					/>
					<Button onClick={changePasswordConfirm} className={styles.button}>
						Отправить
					</Button>
				</div>
			</div>
		</>
	)
}

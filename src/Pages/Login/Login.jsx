import React, { useState } from 'react'
import { login } from '../../Api/Authorization'
import { Button, Input } from '../../Component'
import { LoginSchema } from '../../Helpers/helpers'
import { Header } from '../../Layout/Header/Header'
import { withLayout } from '../../Layout/Layout'
import styles from './Login.module.css'

export const Login = () => {
	const [user, setUser] = useState({
		email: '',
		password: '',
	})

	const [loginError, setLoginError] = useState()

	const handleChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		})
	}

	const LoginUser = () => {
		LoginSchema.validate(user)
			.then((res) => {
				setLoginError(null)
				// login(res)
			})
			.catch((error) => setLoginError(error.message))
	}

	return (
		<>
			<Header />
			<div className={styles.login}>
				<div className={styles.loginWrapper}>
					<p className={styles.title}>Вход</p>
					{loginError && <p className={styles.error}>{loginError}</p>}
					<Input placeholder='Email' name='email' value={user.email} onChange={handleChange} />
					<Input type='password' placeholder='Password' name='password' value={user.password} onChange={handleChange} />
					<Button onClick={LoginUser} className={styles.button}>
						Войти
					</Button>
					<span>
						Еще не зарегистрированы?{' '}
						<a href='/registration' className={styles.link}>
							Регистрация
						</a>
					</span>
					<a href='' className={styles.link}>
						Забыли пароль?
					</a>
				</div>
			</div>
		</>
	)
}

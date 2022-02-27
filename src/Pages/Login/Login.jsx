import React, { useState } from 'react'
import { login } from '../../Api/Authorization'
import { Button, Input } from '../../Component'
import { withLayout } from '../../Layout/Layout'
import styles from './Login.module.css'

const Login = () => {
	const [user, setUser] = useState({
		email: '',
		password: '',
	})

	const handleChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		})
	}

	const LoginUser = () => {
		login(user.email, user.password)
	}

	return (
		<div className={styles.login}>
			<p className={styles.header}>Вход</p>
			<Input placeholder='Email' name='email' value={user.email} onChange={handleChange} />
			<Input type='password' placeholder='Password' name='password' value={user.password} onChange={handleChange} />
			<Button onClick={LoginUser}>Войти</Button>
			<span>
				Еще не зарегистрированы? <a href='/registration'>Регистрация</a>
			</span>
			<a href=''>Забыли пароль?</a>
		</div>
	)
}

export default withLayout(Login)

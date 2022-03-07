import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../Api/Authorization'
import { Button, Input } from '../../Component'
import { UserContext } from '../../Context/user.context'
import { LoginSchema } from '../../Helpers/helpers'
import { Header } from '../../Layout/Header/Header'
import { withLayout } from '../../Layout/Layout'
import styles from './Login.module.css'

export const Login = () => {
	const [value, setValue] = useState({
		email: '',
		password: '',
	})

	const [loginError, setLoginError] = useState()

	const handleChange = (e) => {
		setValue({
			...value,
			[e.target.name]: e.target.value,
		})
	}

	const navigate = useNavigate()

	const { user, setUser } = useContext(UserContext)

	const LoginUser = () => {
		LoginSchema.validate(value)
			.then((res) => {
				setLoginError(null)
				login()
				setUser(localStorage.getItem('user'))
				navigate('/')
			})
			.catch((error) => setLoginError(error.message))
	}

	useEffect(() => {
		if (user) {
			navigate('/')
		}
	}, [])

	return (
		<>
			<Header />
			<div className={styles.login}>
				<div className={styles.loginWrapper}>
					<p className={styles.title}>Вход</p>
					{loginError && <p className={styles.error}>{loginError}</p>}
					<Input placeholder='Email' name='email' value={value.email} onChange={handleChange} />
					<Input type='password' placeholder='Password' name='password' value={value.password} onChange={handleChange} />
					<Button onClick={LoginUser} className={styles.button}>
						Войти
					</Button>
					<span>
						Еще не зарегистрированы?{' '}
						<Link to='/registration' className={styles.link}>
							Регистрация
						</Link>
					</span>
					<Link to='/passwordChange' className={styles.link}>
						Забыли пароль?
					</Link>
				</div>
			</div>
		</>
	)
}

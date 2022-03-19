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

	useEffect(() => {
		if (user) {
			navigate('/')
		}
	}, [])

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
				login(value.email, value.password).then((res) => {
					console.log(res)
					if (res.code == 200) {
						setUser(localStorage.getItem('user'))
						navigate('/')
					} else {
						setLoginError('Неправильный логин или пароль.')
					}
				})
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

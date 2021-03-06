import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../Api/Authorization'
import { Button, Input } from '../../Component'
import { UserContext } from '../../Context/user.context'
import { LoginSchema } from '../../Helpers/helpers'
import { Header } from '../../Layout/Header/Header'
import styles from './Login.module.css'
import ClipLoader from 'react-spinners/ClipLoader'

export const Login = () => {
	const [value, setValue] = useState({
		email: '',
		password: '',
	})

	const [loading, setLoading] = useState(false)

	const navigate = useNavigate()

	const { user, setUser } = useContext(UserContext)

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

	const LoginUser = () => {
		setLoading(true)
		LoginSchema.validate(value)
			.then((res) => {
				setLoginError(null)
				login(value.email, value.password).then((res) => {
					if (res.code == 200) {
						setUser(JSON.parse(localStorage.getItem('user')))
						navigate('/')
					} else {
						setLoginError('Неправильный логин или пароль.')
					}
					setLoading(false)
				})
			})
			.catch((error) => {
				setLoginError(error.message)
				setLoading(false)
			})
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
						{loading ? <ClipLoader /> : 'Войти'}
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

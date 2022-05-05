import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cn from 'classnames'
import { Button, Input } from '../../Component'
import { Header } from '../../Layout/Header/Header'
import { registration } from '../../Api/Authorization'
import styles from './Registration.module.css'
import { UserContext } from '../../Context/user.context'
import { RegistrationSchema } from '../../Helpers/helpers'
import { getUser } from '../../Api/Authorization'

export const Registration = () => {
	const [value, setValue] = useState({
		name: '',
		lastName: '',
		email: '',
		password: '',
		passwordConfirm: '',
	})

	const { user, setUser } = useContext(UserContext)

	const navigate = useNavigate()

	const [registerError, setRegisterError] = useState()

	const [confirm, setConfirm] = useState(false)

	const [toggle, setToggle] = useState('Турист')

	const handleChange = (e) => {
		setValue({
			...value,
			[e.target.name]: e.target.value,
		})
	}

	const RegisterUser = () => {
		RegistrationSchema.validate(value)
			.then((res) => {
				registration(res.name, res.lastName, res.email, res.password).then((res) => {
					if (res.code == 200) {
						setRegisterError(null)
						setConfirm(true)
					} else {
						setRegisterError('При регистрации произошла ошибка')
					}
				})
			})
			.catch((error) => setRegisterError(error.message))
	}

	const changeToggle = (e) => {
		setToggle(e.target.getAttribute('name'))
	}

	useEffect(() => {
		if (user) {
			navigate('/')
		}
	}, [])

	return (
		<>
			<Header />
			<div className={styles.registration}>
				<div className={styles.registrationWrapper}>
					<div className={cn(styles.registrationContent, { [styles.hide]: confirm })}>
						<p className={styles.title}>Регистрация</p>
						<div className={styles.toggle}>
							<div
								className={cn(styles.toggleButton, {
									[styles.toggleButtonActive]: toggle == 'Турист',
								})}
								name='Турист'
								onClick={changeToggle}
							>
								Турист
							</div>
							<div
								className={cn(styles.toggleButton, {
									[styles.toggleButtonActive]: toggle == 'Гид',
								})}
								name='Гид'
								onClick={changeToggle}
							>
								Гид
							</div>
						</div>
						{registerError && <p className={styles.error}>{registerError}</p>}
						<Input placeholder='Имя' name='name' value={value.name} onChange={handleChange} />
						<Input placeholder='Фамилия' name='lastName' value={value.lastName} onChange={handleChange} />
						<Input placeholder='Email' name='email' value={value.email} onChange={handleChange} />
						<Input type='password' placeholder='Пароль' name='password' value={value.password} onChange={handleChange} />
						<Input
							type='password'
							placeholder='Подтверждение пароля'
							name='passwordConfirm'
							value={value.passwordConfirm}
							onChange={handleChange}
						/>
						<span>
							Регистрируясь, вы соглашаетесь с условиями{' '}
							<a href='' className={styles.link}>
								публичной аферты{' '}
							</a>
							и{' '}
							<a href='' className={styles.link}>
								политикой конфиденциальности.
							</a>
						</span>
						<Button className={styles.button} onClick={RegisterUser}>
							Регистрация
						</Button>
						<span>
							Уже зарегистрированы?{' '}
							<Link to='/login' className={styles.link}>
								Вход
							</Link>
						</span>
					</div>
					<div
						className={cn(styles.registrationConfirm, {
							[styles.hide]: !confirm,
						})}
					>
						<p className={styles.title}>Регистрация</p>
						<p>
							Ссылка для подтвеждения была отправлена на ваш адрес электронной почты. Проверьте вашу почту и перейдите по
							ссылке для подтверждения и входа в личный кабинет.
						</p>
						<Link to='/'>
							<Button className={styles.button}>Вернуться на главную</Button>
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}

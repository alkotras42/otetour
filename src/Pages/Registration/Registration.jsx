import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input } from '../../Component'
import { Header } from '../../Layout/Header/Header'
import { registration } from '../../Api/Authorization'
import cn from 'classnames'
import styles from './Registration.module.css'
import { RegistrationSchema } from '../../Helpers/helpers'
import { getUser } from '../../Api/Authorization'

export const Registration = () => {
	const [user, setUser] = useState({
		name: '',
		lastName: '',
		email: '',
		password: '',
		passwordConfirm: '',
	})

	const navigate = useNavigate()

	const [registerError, setRegisterError] = useState()

	const [confirm, setConfirm] = useState(false)

	const [toggle, setToggle] = useState('Турист')

	const handleChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		})
	}

	const RegisterUser = () => {
		RegistrationSchema.validate(user)
			.then((res) => {
				registration(res.name, res.lastName, res.email, res.password).then((res) => {
					if (res.code == 200) {
						setRegisterError(null)
						setConfirm(true)
						console.log(res)
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
		if (getUser()) {
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
						<Input placeholder='Имя' name='name' value={user.name} onChange={handleChange} />
						<Input placeholder='Фамилия' name='lastName' value={user.lastName} onChange={handleChange} />
						<Input placeholder='Email' name='email' value={user.email} onChange={handleChange} />
						<Input type='password' placeholder='Пароль' name='password' value={user.password} onChange={handleChange} />
						<Input
							type='password'
							placeholder='Подтверждение пароля'
							name='passwordConfirm'
							value={user.passwordConfirm}
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

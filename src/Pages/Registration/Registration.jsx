import React, { useState } from 'react'
import { Button, Input } from '../../Component'
import { Header } from '../../Layout/Header/Header'
import { withLayout } from '../../Layout/Layout'
import cn from 'classnames'
import styles from './Registration.module.css'

export const Registration = () => {
	const [toggle, setToggle] = useState('Турист')

	const changeToggle = (e) => {
		setToggle(e.target.getAttribute('name'))
	}

	return (
		<>
			<Header />
			<div className={styles.registration}>
				<div className={styles.registrationWrapper}>
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
					<Input placeholder='Имя' />
					<Input placeholder='Фамилия' />
					<Input placeholder='Email' />
					<Input type='password' placeholder='Пароль' />
					<Input type='password' placeholder='Подтверждение пароля' />
					<span>
						Регистрируясь, вы соглашаетесь с условиями <a href=''>публичной аферты</a> и
						<a href=''> политикой конфиденциальности.</a>
					</span>
					<Button className={styles.button}>Регистрация</Button>
					<span>
						Уже зарегистрированы? <a href='/login'>Вход</a>
					</span>
				</div>
			</div>
		</>
	)
}

import React from 'react'
import { Button, Input } from '../../Component'
import styles from './Login.module.css'

export const Login = () => {
	return (
		<div className={styles.login}>
			<p className={styles.header}>Вход</p>
			<Input placeholder='Email'></Input>
			<Input type='password' placeholder='Password'></Input>
			<Button>Войти</Button>
			<span>
				Еще не зарегистрированы? <a href='/registration'>Регистрация</a>
			</span>
			<a href=''>Забыли пароль?</a>
		</div>
	)
}

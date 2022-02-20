import React from 'react'
import { Button, Input } from '../../Component'
import styles from './Registration.module.css'

export const Registration = () => {
	return (
		<div className={styles.registration}>
			<p className={styles.header}>Регистрация</p>
			<Input placeholder='Имя'/>
			<Input placeholder='Фамилия'/>
			<Input placeholder='Email'/>
			<select className={styles.select}>
				<option value=''>Физическое лицо</option>
				<option value=''>Самозанятый</option>
				<option value=''>Индивидуальный предпрениматель</option>
				<option value=''>Юридическое лицо</option>
			</select>
			<Input type='password' placeholder='Пароль'/>
			<Input type='password' placeholder='Подтверждение пароля'/>

			<Button>Войти</Button>
			<span>
				Еще не зарегистрированы? <a href=''>Регистрация</a>
			</span>
			<a href=''>Забыли пароль?</a>
		</div>
	)
}

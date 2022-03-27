import React from 'react'
import { Link } from 'react-router-dom'

import styles from './NotFound.module.css'

export const NotFound = () => {
	return (
		<div className={styles.notFound}>
			<div className={styles.notFoundWrapper}>
				<img src="/images/404.png" alt="" />
				<p className={styles.title}>Страница не найдена</p>
				<p className={styles.link}>
					<Link to='/'>Вернуться домой</Link>
				</p>
			</div>
		</div>
	)
}

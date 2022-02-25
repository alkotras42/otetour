import React, { useState } from 'react'
import styles from './HomeHeader.module.css'
import cn from 'classnames'
import { Button, Calendar, Location } from '../../../Component'

export const HomeHeader = ({ className, ...props }) => {
	const [active, setActive] = useState(1)

	return (
		// TODO: Добавить функционал быстрого поиска
		<div className={cn(styles.header, className)} {...props}>
			<span className={styles.h1}>Авторские туры от тревел-экспертов со всего мира</span>
			<span className={styles.h2}>
				Ищите, сравнивайте и заказывайте туры напрямую у организатора <br /> без посредников
			</span>
			<div className={styles.toggle}>
				<span
					className={cn(styles.link, styles.search, {
						[styles.active]: active == 1,
					})}
					onClick={() => setActive(1)}
				>
					Поиск
				</span>
				<span
					className={cn(styles.link, styles.fastSearch, {
						[styles.active]: active == 2,
					})}
					onClick={() => setActive(2)}
				>
					Быстрый подбор тура
				</span>
			</div>
			<div className={styles.form}>
				<Location className={styles.location} />
				<Calendar className={styles.calendar} />
				<Button className={styles.button}>Поиск</Button>
			</div>
		</div>
	)
}

import React, { useState } from 'react'
import styles from './HomeHeader.module.css'
import cn from 'classnames'
import { Button, Calendar, Location } from '../../../../Component'
import { useTranslation } from 'react-i18next'

export const HomeHeader = ({ className, ...props }) => {
	const [active, setActive] = useState(1)

	const { t } = useTranslation()

	return (
		// TODO: Добавить функционал быстрого поиска
		<div className={cn(styles.header, className)} {...props}>
			<span className={styles.h1}>{t('Авторские туры от тревел-экспертов со всего мира')}</span>
			<span className={styles.h2}>
				{t('Ищите, сравнивайте и заказывайте туры напрямую у организатора без посредников')}
			</span>
			<div className={styles.toggle}>
				<span
					className={cn(styles.link, styles.search, {
						[styles.active]: active == 1,
					})}
					onClick={() => setActive(1)}
				>
					{t('Поиск')}
				</span>
				<span
					className={cn(styles.link, styles.fastSearch, {
						[styles.active]: active == 2,
					})}
					onClick={() => setActive(2)}
				>
					{t('Быстрый подбор тура')}
				</span>
			</div>
			<div className={styles.form}>
				<Location placeholder={t('Куда')} className={styles.location} />
				<Calendar placeholder={t('Когда')} className={styles.calendar} />
				<Button className={styles.button}>{t('Поиск')}</Button>
			</div>
		</div>
	)
}

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
			<span className={styles.h1}>{t('Home_header_h1')}</span>
			<span className={styles.h2}>
				{t('Home_header_h2')}
			</span>
			<div className={styles.toggle}>
				<span
					className={cn(styles.link, styles.search, {
						[styles.active]: active == 1,
					})}
					onClick={() => setActive(1)}
				>
					{t('Home_header_search')}
				</span>
				<span
					className={cn(styles.link, styles.fastSearch, {
						[styles.active]: active == 2,
					})}
					onClick={() => setActive(2)}
				>
					{t('Home_header_fast_search')}
				</span>
			</div>
			<div className={styles.form}>
				<Location placeholder={t('Home_header_where')} className={styles.location} />
				<Calendar placeholder={t('Home_header_when')} className={styles.calendar} />
				<Button className={styles.button}>{t('Home_header_search')}</Button>
			</div>
		</div>
	)
}

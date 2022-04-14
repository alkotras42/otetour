import React from 'react'
import styles from './Follow.module.css'
import cn from 'classnames'
import { Button, Input } from '../../../../Component'
import { useTranslation } from 'react-i18next'

export const Follow = ({ className, ...props }) => {
	const { t } = useTranslation()

	return (
		<div className={cn(styles.follow, className)} {...props}>
			<div className={styles.followWrapper}>
				<div className={styles.title}>{t('Подпишитесь, чтобы первыми узнавать обо всех новостях и акциях')}</div>
				<div className={styles.form}>
					<Input placeholder='Email' className={styles.input} />
					<Button className={styles.button}>{t('Подписаться')}</Button>
				</div>
				<p className={styles.text}>
					{t('Предоставляя свои данные, я соглашаюсь с')}{' '}
					<a href='' className={styles.link}>
						{t('политикой конфиденциальности')}
					</a>
				</p>
			</div>
		</div>
	)
}

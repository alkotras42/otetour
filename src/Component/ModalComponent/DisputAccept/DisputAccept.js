import React from 'react'
import cn from 'classnames'
import styles from './DisputAccept.module.css'
import { Button } from '../../Button/Button'
import { useTranslation } from 'react-i18next'

export const DisputAccept = ({ className, ...props }) => {

	const {t} = useTranslation()
	return (
		<div className={cn(className, styles.disputAccept)} {...props}>
			<p className={styles.disputAcceptTitle}>{t('Принять условия')}</p>
			<p className={styles.disputAcceptBody}>
				{t(
					'Условия спора будут соблюдены. Если Вам полагается компенсация, она будет перечислена в течение 2 недель. Вы уверены, что хотите принять условия спора?'
				)}
			</p>

			<Button className={styles.disputAcceptButton}>{t('Принять условия')}</Button>
		</div>
	)
}

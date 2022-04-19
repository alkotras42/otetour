import React, { useState } from 'react'
import cn from 'classnames'
import styles from './DisputDecline.module.css'
import { Button } from '../../Button/Button'
import { useTranslation } from 'react-i18next'

export const DisputDecline = ({ className, ...props }) => {
	const { t } = useTranslation()
	return (
		<div className={cn(className, styles.disputDecline)} {...props}>
			<p class={styles.disputDeclineTitle}>{t('Отклонить условия')}</p>
			<p className={styles.disputDeclineBody}>
				{t(
					'Вопрос будет передан в арбитраж. С вами свяжутся в течение 2 недель. Вы уверены, что хотите отклонить условия спора?'
				)}
			</p>

			<Button className={styles.disputDeclineButton}>{t('Отклонить условия')}</Button>
		</div>
	)
}

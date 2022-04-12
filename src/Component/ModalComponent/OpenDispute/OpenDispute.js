import React, { useState } from 'react'
import cn from 'classnames'
import styles from './OpenDispute.module.css'
import { t } from 'i18next'
import { TextArea } from '../../TextArea/TextArea'
import { Button } from '../../Button/Button'

export const OpenDispute = ({ className, ...props }) => {
	const [value, setValue] = useState('')

	const handleChange = (e) => {
		setValue(e.target.value)
	}

	return (
		<div className={cn(className, styles.openDispute)} {...props}>
			<p className={styles.openDisputeTitle}>{t('Открыть спор')}</p>
			<p className={styles.openDisputeBody}>
				{t('При открытии спора, данные будут переданы гиду. После этого гид предложит Вам решение спора.')}
			</p>
			<div>
				<TextArea
					name='Comment'
					placeholder={t('Комментарий')}
					value={value}
					onChange={handleChange}
					className={styles.openDisputeInput}
				/>
			</div>
			<Button className={styles.openDisputeButton}>Открыть спор</Button>
		</div>
	)
}

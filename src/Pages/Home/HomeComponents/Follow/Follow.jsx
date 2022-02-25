import React from 'react'
import styles from './Follow.module.css'
import cn from 'classnames'
import { Button, Input } from '../../../../Component'

export const Follow = ({ className, ...props }) => {
	return (
		<div className={cn(styles.follow, className)} {...props}>
			<div className={styles.followWrapper}>
				<div className={styles.title}>Подпишитесь, чтобы первыми узнавать обо всех новостях и акциях </div>
				<div className={styles.form}>
					<Input placeholder='Email' className={styles.input} />
					<Button className={styles.button}>Подписаться</Button>
				</div>
				<p className={styles.text}>
					Предоставляя свои данные, я соглашаюсь с <a href='' className={styles.link}>политикой конфиденциальности</a>
				</p>
			</div>
		</div>
	)
}

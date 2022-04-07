import React from 'react'
import styles from './AboutUs.module.css'
import cn from 'classnames'
import aboutImg1 from './aboutImg1.svg'
import aboutImg2 from './aboutImg2.svg'
import aboutImg3 from './aboutImg3.svg'
import { t } from 'i18next'

export const AboutUs = ({ className, ...props }) => {
	return (
		<div className={cn(styles.about, className)} {...props}>
			<div className={styles.aboutWrapper}>
				<span className={styles.title}>{t('Почему именно мы?')}</span>
				<div className={styles.items}>
					<div>
						<img src={aboutImg1} alt='' className={styles.image} />
						<p className={styles.itemTitle}>{t('Все самое лучшее')}</p>
						<p className={styles.itemBody}>
							{t(
								'Только тщательно продуманные, безопасные и проверенные маршруты от независимых гидов и экспертов по путешествиям.'
							)}
						</p>
					</div>
					<div>
						<img src={aboutImg2} alt='' className={styles.image} />
						<p className={styles.itemTitle}>{t('Гарантия цены')}</p>
						<p className={styles.itemBody}>{t('Никаких наценок. Цена от организатора тура.')}</p>
					</div>
					<div>
						<img src={aboutImg3} alt='' className={styles.image} />
						<p className={styles.itemTitle}>{t('Защищенные платежи')}</p>
						<p className={styles.itemBody}>{t('Мы используем только безопасные системы оплаты, одобренные во всём мире.')}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

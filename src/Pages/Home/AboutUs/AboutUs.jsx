import React from 'react'
import styles from './AboutUs.module.css'
import cn from 'classnames'
import aboutImg1 from './aboutImg1.svg'
import aboutImg2 from './aboutImg2.svg'
import aboutImg3 from './aboutImg3.svg'

export const AboutUs = ({ className, ...props }) => {
	return (
		<div className={cn(styles.about, className)} {...props}>
			<div className={styles.aboutWrapper}>
				<span className={styles.title}>Почему именно мы?</span>
				<div className={styles.items}>
					<img src={aboutImg1} alt='' className={styles.image} />
					<span className={styles.itemTitle}>Все самое лучшее</span>
					<span className={styles.itemBody}>
						Только тщательно продуманные, безопасные и проверенные маршруты от независимых гидов и экспертов по путешествиям.
					</span>
					<img src={aboutImg2} alt='' className={styles.image} />
					<span className={styles.itemTitle}>Гарантия цены</span>
					<span className={styles.itemBody}>Никаких наценок. Цена от организатора тура.</span>
					<img src={aboutImg3} alt='' className={styles.image} />
					<span className={styles.itemTitle}>Защищенные платежи</span>
					<span className={styles.itemBody}>Мы используем только безопасные системы оплаты, одобренные во всём мире.</span>
				</div>
			</div>
		</div>
	)
}

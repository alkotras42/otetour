import React from 'react'
import styles from './HowItWork.module.css'
import cn from 'classnames'
import arrow1 from './arrow1.svg'
import arrow2 from './arrow2.svg'
import arrow3 from './arrow3.svg'
import { useTranslation } from 'react-i18next'

export const HowItWork = ({ className, ...props }) => {
	const { t } = useTranslation()

	return (
		<div className={cn(styles.about, className)} {...props}>
			<div className={styles.aboutWrapper}>
				<span className={styles.title}>{t('Как это работает?')}</span>
				<div className={styles.itemsWrapper}>
					<div className={styles.items}>
						<div className={cn(styles.item, styles.item1)}>
							<div>
								<div className={styles.number}>1</div>
								<span className={styles.itemTitle}>{t('Выберите тур')}</span>
								<p className={styles.itemBody}>
									{t(
										'Здесь собрано множество предложений от проверенных экспертов, которые берут всю организацию на себя, чтобы сделать Ваш отдых лучшим.'
									)}
								</p>
								<img src={arrow1} alt='' className={styles.arrow1} />
							</div>
						</div>
						<div className={cn(styles.item, styles.item2)}>
							<div>
								<div className={styles.number}>2</div>
								<span className={styles.itemTitle}>{t('Пообщайтесь с организатором')}</span>
								<p className={styles.itemBody}>
									{t(
										'Все поездки у экспертов по путешествиям тщательно спланированы. Вы можете уточнить всю интересующую информацию напрямую у организатора.'
									)}
								</p>
								<img src={arrow1} alt='' className={styles.arrow2} />
							</div>
						</div>
						<div className={cn(styles.item, styles.item3)}>
							<div>
								<div className={styles.number}>3</div>
								<span className={styles.itemTitle}>{t('Забронируйте тур')}</span>
								<p className={styles.itemBody}>
									{t('С помощью безопасной системы приёма платежей забронируйте понравившийся Вам тур.')}
								</p>
								<img src={arrow2} alt='' className={styles.arrow3} />
							</div>
						</div>
						<div className={styles.secondRow}>
							<div className={cn(styles.item, styles.item4)}>
								<div>
									<div className={styles.number}>4</div>
									<span className={styles.itemTitle}>{t('Оставьте свой отзыв')}</span>
									<p className={styles.itemBody}>
										{t('Делитесь своими впечатлениями от поездки, ведь это поможет будущему путешественнику сделать свой выбор.')}
									</p>
								</div>
							</div>
							<div className={cn(styles.item, styles.item5)}>
								<div>
									<div className={styles.number}>5</div>
									<span className={styles.itemTitle}>{t('Возвращайтесь к нам')}</span>
									<p className={styles.itemBody}>
										{t('Возвращайтесь к нам за новыми приключениями и незабываемыми впечатлениями!')}
									</p>
									<img src={arrow3} alt='' className={styles.arrow4} />
								</div>
							</div>
						</div>
						<div className={cn(styles.item, styles.item4, styles.itemReverse)}>
							<div>
								<div className={styles.number}>4</div>
								<span className={styles.itemTitle}>{t('Оставьте свой отзыв')}</span>
								<p className={styles.itemBody}>
									{t('Делитесь своими впечатлениями от поездки, ведь это поможет будущему путешественнику сделать свой выбор.')}
								</p>
							</div>
						</div>
						<div className={cn(styles.item, styles.item5, styles.itemReverse)}>
							<div>
								<div className={styles.number}>5</div>
								<span className={styles.itemTitle}>{t('Возвращайтесь к нам')}</span>
								<p className={styles.itemBody}>
									{t('Возвращайтесь к нам за новыми приключениями и незабываемыми впечатлениями!')}
								</p>
								<img src={arrow3} alt='' className={styles.arrow4} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

import React from 'react'
import styles from './Footer.module.css'
import cn from 'classnames'
import { Button } from '../../Component'
import instIcon from './inst.svg'
import vkIcon from './vk.svg'
import facebookIcon from './facebook.svg'

export const Footer = ({ className, ...props }) => {
	return (
		<div className={cn(styles.footer, className)} {...props}>
			<div className={styles.links}>
				<div>
					<p className={styles.title}>Для путешествеников</p>
					<a href='' className={styles.link}>
						Что такое авторские туры
					</a>
					<a href='' className={styles.link}>
						Индивидуальные туры
					</a>
					<a href='' className={styles.link}>
						Континентальные туры
					</a>
					<a href='' className={styles.link}>
						Тематические туры
					</a>
					<a href='' className={styles.link}>
						Оплата
					</a>
					<a href='' className={styles.link}>
						Почему O.T.E.TOUR
					</a>
					<a href='' className={styles.link}>
						Как устроен сервис
					</a>
					<a href='' className={styles.link}>
						Связаться с нами
					</a>
				</div>
				<div>
					<p className={styles.title}>O.T.E.TOUR</p>
					<a href='' className={styles.link}>
						О нас
					</a>
					<a href='' className={styles.link}>
						Вакансии
					</a>
					<a href='' className={styles.link}>
						Отзывы путешественников
					</a>
					<a href='' className={styles.link}>
						Условия и положения (публичная оферта)
					</a>
					<a href='' className={styles.link}>
						Конфиденциальность
					</a>
					<a href='' className={styles.link}>
						Конфиденциальность
					</a>
					<a href='' className={styles.link}>
						Политика использования файлов cookie
					</a>
				</div>
				<div>
					<p className={styles.title}>Гидам</p>
					<a href='' className={styles.link}>
						Условия сотрудничества
					</a>
					<a href='' className={styles.link}>
						Как начать работу
					</a>
					<a href='' className={styles.link}>
						Регистрация
					</a>
					<a href='' className={styles.link}>
						Связаться с нами
					</a>
				</div>
				<div>
					<p className={styles.title}>Партнёрам</p>
					<a href='' className={styles.link}>
						Партнерская программа
					</a>
					<a href='' className={styles.link}>
						Партнёрские отношения
					</a>
					<a href='' className={styles.link}>
						Связаться с нами
					</a>
				</div>
			</div>
			<div className={styles.contacts}>
				<p>© 2021 OTE TOUR</p>
				<div>
					<span>Остались вопросы?</span>
					<Button className={styles.button}>Связаться с нами</Button>
				</div>
				<div className={styles.socials}>
					<img src={instIcon} alt='' />
					<img src={vkIcon} alt='' />
					<img src={facebookIcon} alt='' />
				</div>
			</div>
		</div>
	)
}

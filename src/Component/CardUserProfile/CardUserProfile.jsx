import React from 'react'
import cn from 'classnames'
import styles from './CardUserProfile.module.css'
import { priceRu } from '../../Helpers/helpers'
import { Button } from '../Button/Button'
import { Link } from 'react-router-dom'

export const CardUserProfile = ({ className, type = 'upcoming', card, ...props }) => {
	const UpcomingCard = ({ card }) => (
		<div className={cn(className, styles.card)} {...props}>
			<div className={styles.cardTop}>
				<img src={`/images/${card.img}`} alt='' className={styles.image} />
			</div>
			<div className={styles.cardBottom}>
				<div className={styles.type}>{card.type}</div>
				<div className={styles.title}>{card.title}</div>
				<div className={styles.info}>
					<span>Даты</span>
					{`${card.dateStart} — ${card.dateEnd}`}
					<span>Занято мест</span>
					{`${card.plasesHold} из ${card.plasesTotal}`}
					<span>Осталось оплатить</span>
					<div>{priceRu(card.price)}</div>
				</div>
				<Button className={styles.button}>Написать гиду</Button>
			</div>
		</div>
	)

	const WaitingCard = ({ card }) => (
		<div className={cn(className, styles.card)} {...props}>
			<div className={styles.cardTop}>
				<img src={`/images/${card.img}`} alt='' className={styles.image} />
			</div>
			<div className={styles.cardBottom}>
				<div className={styles.type}>{card.type}</div>
				<div className={styles.title}>{card.title}</div>
				<div className={styles.info}>
					<span>Даты</span>
					{`${card.dateStart} — ${card.dateEnd}`}
					<span>Занято мест</span>
					{`${card.plasesHold} из ${card.plasesTotal}`}
					<span className={styles.red}>Необходимо оплатить</span>
					<div className={styles.red}>{priceRu(card.price)}</div>
				</div>
				<Link to='/tour/tourPay/1'>
					<Button className={styles.button}>Оплатить</Button>
				</Link>
				<Button color='white' className={styles.button}>
					Написать гиду
				</Button>
			</div>
		</div>
	)

	const NotConfCard = ({ card }) => (
		<div className={cn(className, styles.card)} {...props}>
			<div className={styles.cardTop}>
				<img src={`/images/${card.img}`} alt='' className={styles.image} />
			</div>
			<div className={styles.cardBottom}>
				<div className={styles.type}>{card.type}</div>
				<div className={styles.title}>{card.title}</div>
				<div className={styles.info}>
					<span>Даты</span>
					{`${card.dateStart} — ${card.dateEnd}`}
					<span>Занято мест</span>
					{`${card.plasesHold} из ${card.plasesTotal}`}
					<span>Стоимость</span>
					<div>{priceRu(card.price)}</div>
				</div>
				<Button className={styles.button}>Написать гиду</Button>
			</div>
		</div>
	)

	const CompletedCard = ({ card }) => (
		<div className={cn(className, styles.card)} {...props}>
			<div className={styles.cardTop}>
				<img src={`/images/${card.img}`} alt='' className={styles.image} />
			</div>
			<div className={styles.cardBottom}>
				<div className={styles.type}>{card.type}</div>
				<div className={styles.title}>{card.title}</div>
				<div className={styles.info}>
					{`${card.dateStart + ' ' + new Date().getFullYear()} — ${card.dateEnd + ' ' + new Date().getFullYear()}`}
					<div> </div>
					<Link to='' className={styles.link}>
						Оставить отзыв
					</Link>
				</div>
				<Button className={styles.button}>Сделка совершена</Button>
				<Button color='white' className={styles.button}>
					Открыть спор
				</Button>
			</div>
		</div>
	)

	return (() => {
		switch (type) {
			case 'upcoming':
				return <UpcomingCard card={card} />
			case 'waiting':
				return <WaitingCard card={card} />
			case 'notConf':
				return <NotConfCard card={card} />
			case 'completed':
				return <CompletedCard card={card} />
		}
	})()
}

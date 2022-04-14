import React from 'react'
import cn from 'classnames'
import styles from './CountryPick.module.css'
import { CardMini } from '../../../../Component'
import { useTranslation } from 'react-i18next'

export const CountryPick = ({ className, ...props }) => {
	const { t } = useTranslation()

	const card_data = {
		country: 'Россия',
		img: 'images/countryImg1.png',
	}
	return (
		<div className={cn(className, styles.countyPicker)} {...props}>
			<span className={styles.title}>{t('Выберите страну для путешествия своей мечты')}</span>
			<div className={styles.countries}>
				<CardMini card={card_data} />
				<CardMini card={card_data} />
				<CardMini card={card_data} />
				<CardMini card={card_data} />
				<CardMini card={card_data} />
				<CardMini card={card_data} />
				<CardMini card={card_data} />
				<CardMini card={card_data} />
				<CardMini card={card_data} />
				<CardMini card={card_data} />
				<CardMini card={card_data} />
				<CardMini card={card_data} />
			</div>
		</div>
	)
}

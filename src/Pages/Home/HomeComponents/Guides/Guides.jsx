import React from 'react'
import cn from 'classnames'
import { Carousel, GuideCard } from '../../../../Component'
import styles from './Guides.module.css'
import { useWindowWidth } from '@react-hook/window-size'
import { useTranslation } from 'react-i18next'

export const Guides = ({ className, ...props }) => {
	const { t } = useTranslation()
	const Width = useWindowWidth()

	const guide_data = {
		name: 'Алексей',
		country: 'Германия',
		type: 'Вело-туры',
		img: 'guideImg1.png',
	}

	return (
		<div className={cn(className, styles.guides)} {...props}>
			<span className={styles.title}>{t('Наши гиды')}</span>
			<Carousel loop={true} itemsCount={Width > 880 ? 4 : 3}>
				<GuideCard card={guide_data} />
				<GuideCard card={guide_data} />
				<GuideCard card={guide_data} />
				<GuideCard card={guide_data} />
				<GuideCard card={guide_data} />
				<GuideCard card={guide_data} />
			</Carousel>
		</div>
	)
}

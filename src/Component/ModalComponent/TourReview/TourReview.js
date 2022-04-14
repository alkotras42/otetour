import React, { useState } from 'react'
import cn from 'classnames'
import styles from './TourReview.module.css'
import { Rating } from '../../Rating/Rating'
import PhotoIcon from './Photo.svg'
import { TextArea } from '../../TextArea/TextArea'
import { Button } from '../../Button/Button'
import { useTranslation } from 'react-i18next'

export const TourReview = ({ className, card, ...props }) => {
	const { t } = useTranslation(t)
	const [rating, setRating] = useState(0)
	const [value, setValue] = useState('')

	const handleChange = (e) => {
		setValue(e.target.value)
	}

	return (
		<div className={cn(className, styles.tourReview)} {...props}>
			<p className={styles.tourReviewTitle}>{t('Ваш отзыв о туре')}</p>
			<div className={styles.tourReviewHeader}>
				<img src={`/images/${card.img}`} alt='' className={styles.tourReviewImage} />
				<div className={styles.tourReviewInfo}>
					<p className={styles.tourReviewType}>{card.type}</p>
					<p className={styles.tourReviewName}>{card.title}</p>
					<p className={styles.tourReviewDates}>{`${card.dateStart} — ${card.dateEnd}`}</p>
				</div>
			</div>
			<div className={styles.tourReviewRating}>
				<p className={styles.tourReviewRatingTitle}>{t('Оцените тур')}</p>
				<Rating isEditible={true} rating={rating} setRating={setRating} />
			</div>
			<div className={styles.tourReviewBody}>
				<p className={styles.tourReviewBodyTitle}>{t('Оцените тур')}</p>
				<TextArea
					name='review'
					placeholder={t('Отзыв')}
					value={value}
					onChange={handleChange}
					className={styles.tourReviewInput}
				/>
			</div>
			<div className={styles.tourReviewPhotos}>
				{/* TODO: Добавить функционал загрузки изображений  */}

				<p className={styles.tourReviewPhotosTitle}>{t('Добавьте фотографии (до 10 изображений)')}</p>
				<div className={styles.tourReviewPhotosSelect}>
					<img src={PhotoIcon} alt='' />
				</div>
			</div>
			<Button className={styles.tourReviewSaveButton}>Сохранить</Button>
		</div>
	)
}

import React, { useState } from 'react'
import cn from 'classnames'
import styles from './Comment.module.css'
import { priceRu } from '../../Helpers/helpers'
import { Button } from '../Button/Button'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import { TourReview } from '../ModalComponent/TourReview/TourReview'
import { DisputAccept } from '../ModalComponent/DisputAccept/DisputAccept'
import { DisputDecline } from '../ModalComponent/DisputDecline/DisputDecline'
import { Rating } from '../Rating/Rating'

export const Comment = ({ className, type = 'dispute', comment, ...props }) => {
	const [showAcceptModal, setShowAcceptModal] = useState(false)
	const [showDeclineModal, setShowDeclineModal] = useState(false)

	const DisputeComment = ({ disput }) => (
		<div className={styles.disputItem} {...props}>
			<div className={styles.disputHeader}>
				<img src={'/images/' + disput.tourImg} alt='' />
				<div className={styles.disputData}>
					<div className={styles.tourType}>{disput.tourType}</div>
					<div className={styles.tourTitle}>{disput.tourTitle}</div>
					<div className={styles.tourDates}>{`${disput.tourDateStart} — ${disput.tourDateEnd}`}</div>
				</div>
			</div>
			<div className={styles.disputBody}>{disput.disputBody}</div>
			{disput.disputComments &&
				disput.disputComments.map((comment) => (
					<div className={styles.commentItem}>
						<div className={styles.commentInfo}>
							<div className={styles.comentUser}>{comment.comentUser}</div>
							<div className={styles.commentBody}>{comment.commentBody}</div>
						</div>
						<div className={styles.commentButtons}>
							<span className={styles.accept} onClick={() => setShowAcceptModal(true)}>
								Принять условия
							</span>
							<span className={styles.decline} onClick={() => setShowDeclineModal(true)}>
								Отказаться
							</span>
						</div>
						<Modal isOpen={showAcceptModal} onRequestClose={() => setShowAcceptModal(false)} className={styles.modal}>
							<DisputAccept />
						</Modal>
						<Modal isOpen={showDeclineModal} onRequestClose={() => setShowDeclineModal(false)} className={styles.modal}>
							<DisputDecline />
						</Modal>
					</div>
				))}
		</div>
	)

	const ReviewComment = ({ review }) => (
		<div className={styles.reviewItem} {...props}>
			<div className={styles.reviewHeader}>
				<img src={'/images/' + review.tourImg} className={styles.reviewImage} alt='' />
				<div className={styles.reviewData}>
					<div className={styles.tourType}>{review.tourType}</div>
					<div className={styles.tourTitle}>{review.tourTitle}</div>
				</div>
			</div>
			<div className={styles.reviewInfo}>
				<div className={styles.tourDates}>{review.date}</div>
				<Rating rating={review.rating} />
			</div>
			<div className={styles.disputBody}>{review.reviewBody}</div>
			<div className={styles.reviewImages}>
				{review.images && review.images.map((image) => <img src={image.url} alt='' className={styles.reviewImageItem} />)}
			</div>

			{review.reviewComments &&
				review.reviewComments.map((comment) => (
					<div className={styles.commentItem}>
						<div className={styles.commentInfo}>
							<div className={styles.comentUser}>{comment.comentUser}</div>
							<div className={styles.tourDates}>{comment.commentDate}</div>
							<div className={styles.commentBody}>{comment.commentBody}</div>
						</div>
					</div>
				))}
		</div>
	)

	return (() => {
		switch (type) {
			case 'dispute':
				return <DisputeComment disput={comment} />
			case 'review':
				return <ReviewComment review={comment} />
		}
	})()
}

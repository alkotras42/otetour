import React, { useState } from 'react'
import { Header } from '../../../../Layout/Header/Header'
import styles from './ProfileChats.module.css'
import cn from 'classnames'
import chatIcon from './chat.svg'
import clipIcon from './clip.svg'
import sendIcon from './send.svg'
import arrowIcon from './arrow.svg'

const ProfileChats = () => {
	const [value, setValue] = useState(null)

	const chats = [
		{
			chatId: 1,
			tourTitle: 'Путешествие по Индии',
			tourType: 'Фитнес-тур',
			tourImg: 'blogImg1.png',
			guideName: 'Алексей',
			guideImg: 'guideImg1.png',
			messages: [
				{
					msgId: 1,
					mgsUserId: 1,
					msgTime: '11:30',
					msgBody: 'Здравствуйте!',
				},
				{
					msgId: 2,
					mgsUserId: 2,
					msgTime: '11:30',
					msgBody: 'Здравствуйте!',
				},
			],
		},
		{
			chatId: 2,
			tourTitle: 'Тур по Карелии',
			tourType: 'Фитнес-тур',
			tourImg: 'blogImg1.png',
			guideName: 'Андрей',
			guideImg: 'guideImg1.png',
			messages: [
				{
					msgId: 1,
					mgsUserId: 1,
					msgTime: '12:30',
					msgBody: 'Lorem ipsum dolor sit amet.',
				},
				{
					msgId: 2,
					mgsUserId: 2,
					msgTime: '13:30',
					msgBody: 'Добрый вечер! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id neque justo nec enim.',
				},
				{
					msgId: 3,
					mgsUserId: 1,
					msgTime: '14:30',
					msgBody: 'Добрый вечер! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id neque justo nec enim.!',
				},
			],
		},
	]

	return (
		<>
			<Header></Header>
			<div className={styles.chats}>
				<div className={cn(styles.chatsHeader, styles.chatsHeaderChats)}>Сообщения</div>
				<div className={cn(styles.chatsHeader, styles.chatsHeaderMessages)}>
					{value ? chats[value - 1].guideName : null}
				</div>
				<div
					className={cn(styles.chatsList, {
						[styles.activeBlock]: value,
					})}
				>
					{chats &&
						chats.map((chat) => (
							<div
								className={cn(styles.chatItem, {
									[styles.active]: value == chat.chatId,
								})}
								onClick={() => setValue(chat.chatId)}
							>
								<img src={`/images/${chat.guideImg}`} alt='' className={styles.chatItemImage} />
								<div className={styles.chatItemInfo}>
									<div className={styles.chatItemTitle}>{`${chat.guideName} (${chat.tourTitle})`}</div>
									<div className={styles.chatItemLastMessage}>
										{chat.messages[chat.messages.length - 1].mgsUserId == 1 ? <span className={styles.you}>Вы: </span> : null}
										{chat.messages[chat.messages.length - 1].msgBody}
									</div>
								</div>
							</div>
						))}
				</div>
				<div className={styles.messageHistory}>
					{value ? (
						<div className={styles.messagesList}>
							<div className={styles.messageHeader}>
								<img src={'/images/' + chats[value - 1].tourImg} alt='' className={styles.messageImage} />
								<div className={styles.messageInfo}>
									<div className={styles.messageTourType}>{chats[value - 1].tourType}</div>
									<div className={styles.messageTourTitle}>{chats[value - 1].tourTitle}</div>
								</div>
								<img src={arrowIcon} alt="" className={styles.arrowIcon} onClick={() => setValue(null)} />
							</div>
							<div className={styles.messages}>
								{chats[value - 1].messages.map((message) => (
									<div
										className={cn(styles.messageItem, {
											[styles.myMessage]: message.mgsUserId == 1,
											[styles.notMyMessage]: message.mgsUserId !== 1,
										})}
									>
										<div className={styles.messageBody}>{message.msgBody}</div>
										<div className={styles.messageTime}>{message.msgTime}</div>
									</div>
								))}
							</div>
							<div className={styles.messageInputContainer}>
								<img src={clipIcon} alt='' className={styles.clipIcon} />
								<img src={sendIcon} alt='' className={styles.sendIcon} />
								<input type='text' placeholder='Введите сообщение...' className={styles.messageInput} />
							</div>
						</div>
					) : (
						<div className={styles.messagesIdle}>
							<img src={chatIcon} alt='' className={styles.chatIcon} />
							<p className={styles.chatIdleText}>Выберите чат, чтобы просмотреть сообщения</p>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default ProfileChats

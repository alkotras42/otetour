import React, { useState } from 'react'
import styles from './Header.module.css'
import LogoIcon from './logo.svg'
import UserIcon from './user.svg'
import LanguageIcon from './language.svg'
import arrow from './arrow.svg'
import cn from 'classnames'

export const Header = ({ className, ...props }) => {
	const [showDropdown, setShowDropdown] = useState(false)

	const changeShowDropdown = () => {
		setShowDropdown(!showDropdown)
	}

	return (
		<div className={cn(styles.header, className)} {...props}>
			<img src={LogoIcon} alt='' className={styles.logo} />
			<span>Все туры</span>
			<span>Туры по тематикам</span>
			<span>Блог</span>
			<div className={styles.language} onClick={changeShowDropdown}>
				<img src={LanguageIcon} alt='' />
				<span>Русский</span>
				<img
					src={arrow}
					alt=''
					className={cn(styles.arrow, {
						[styles.show]: showDropdown,
					})}
				/>
				<div
					className={cn(styles.dropdown, {
						[styles.hide]: !showDropdown,
					})}
				>
					<span>Русский</span>
					<span>Английский</span>
					<span>Французский</span>
					<span>Испанский</span>
					<span>Итальянский</span>
					<span>Немецкий</span>
				</div>
			</div>
			<a href='/login'>
				<img src={UserIcon} alt='' className={styles.user} />
			</a>
		</div>
	)
}

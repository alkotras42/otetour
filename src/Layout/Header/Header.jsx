import React, { useState } from 'react'
import styles from './Header.module.css'
import LogoIcon from './images/logo.png'
import UserIcon from './images/user.svg'
import LanguageIcon from './images/language.svg'
import ToursIcon from './images/tours.svg'
import ThemesIcon from './images/themes.svg'
import BlogIcon from './images/blog.svg'

import arrow from './images/arrow.svg'
import cn from 'classnames'
import { slide as Menu } from 'react-burger-menu'

export const Header = ({ className, ...props }) => {
	const [showDropdown, setShowDropdown] = useState(false)

	const changeShowDropdown = () => {
		setShowDropdown(!showDropdown)
	}

	const MenuStyles = {
		bmBurgerButton: {
			position: 'absolute',
			width: '36px',
			height: '30px',
			left: '30px',
			top: '27px',
		},
		bmBurgerBars: {
			background: '#373a47',
		},
		bmBurgerBarsHover: {
			background: '#a90000',
		},
		bmCrossButton: {
			height: '24px',
			width: '24px',
		},
		bmCross: {
			background: '#bdc3c7',
		},
		bmMenuWrap: {
			position: 'fixed',
		},
		bmMenu: {
			background: 'white',
		},
		bmMorphShape: {
			fill: '#373a47',
		},
		bmItemList: {
			display: 'grid',
			gap: '15px',
			height: 'auto',
		},
		bmItem: {
			display: 'grid',
			fontSize: '16px',
			lineHeight: '20px',
			paddingLeft: '20px',
		},
		bmOverlay: {
			background: 'rgba(0, 0, 0, 0.3)',
		},
	}

	return (
		<div className={cn(styles.header, className)} {...props}>
			<div className={styles.burgerMenu}>
				<Menu styles={MenuStyles}>
					<div>
						<img src={LogoIcon} alt='' className={styles.menuLogo} />
					</div>
					<div>
						<a href='/login'>
							<img src={ToursIcon} alt='' className={styles.menuIcon} />
							Все туры
						</a>
					</div>
					<div>
						<a href='/login'>
							<img src={ThemesIcon} alt='' className={styles.menuIcon} />
							Туры по тематикам
						</a>
					</div>
					<div>
						<a href='/login'>
							<img src={BlogIcon} alt='' className={styles.menuIcon} />
							Блог
						</a>
					</div>
					<hr className={styles.hr} />
					<div>
						<a href='/login'>
							<img src={UserIcon} alt='' className={styles.menuIcon} />
							Вход
						</a>
					</div>
					<hr className={styles.hr} />
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
				</Menu>
			</div>
			<div className={styles.menu}>
				<img src={LogoIcon} alt='' className={styles.logo} />
				<div>
					<span>Все туры</span>
				</div>
				<div>
					<span>Туры по тематикам</span>
				</div>
				<div>
					<span>Блог</span>
				</div>
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
				<div>
					<a href='/login'>
						<img src={UserIcon} alt='' className={styles.user} />
					</a>
				</div>
			</div>
		</div>
	)
}

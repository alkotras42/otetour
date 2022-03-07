import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import LogoIcon from './images/logo.png'
import UserIcon from './images/user.svg'
import LanguageIcon from './images/language.svg'
import ToursIcon from './images/tours.svg'
import ThemesIcon from './images/themes.svg'
import BlogIcon from './images/blog.svg'
import MenuIcon from './images/menu.svg'
import { MenuStyles } from './MenuStyle'
import arrow from './images/arrow.svg'
import cn from 'classnames'
import { slide as Menu } from 'react-burger-menu'
import { UserContext } from '../../Context/user.context'
import { logout } from '../../Api/Authorization'

export const Header = ({ className, ...props }) => {
	const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)

	const [showUserMenu, setShowUserMenu] = useState(false)

	const userMenuRef = useRef()

	const {user, setUser} = useContext(UserContext)

	// Для закрытия менюшек при нажатии вне их
	useEffect(() => {
		const checkIfClickedOutside = (e) => {
			if (showLanguageDropdown && userMenuRef.current && !userMenuRef.current.contains(e.target)) {
				setShowLanguageDropdown(false)
			}
			if (showUserMenu && userMenuRef.current && !userMenuRef.current.contains(e.target)) {
				setShowUserMenu(false)
			}
		}

		document.addEventListener('mousedown', checkIfClickedOutside)

		return () => {
			document.removeEventListener('mousedown', checkIfClickedOutside)
		}
	}, [showUserMenu, showLanguageDropdown])

	const changeUserMenu = () => {
		setShowUserMenu((prev) => !prev)
	}

	const changeShowDropdown = () => {
		setShowLanguageDropdown((prev) => !prev)
	}

	const handleLogout = () => {
		setUser(null)
		logout()
	}

	return (
		<div className={cn(styles.header, className)} {...props}>
			<div className={styles.burgerMenu}>
				<Menu styles={MenuStyles} customBurgerIcon={<img src={MenuIcon} />}>
					<div>
						<img src={LogoIcon} alt='' className={styles.menuLogo} />
					</div>
					<div>
						<a href=''>
							<img src={ToursIcon} alt='' className={styles.menuIcon} />
							Все туры
						</a>
					</div>
					<div>
						<a href=''>
							<img src={ThemesIcon} alt='' className={styles.menuIcon} />
							Туры по тематикам
						</a>
					</div>
					<div>
						<a href=''>
							<img src={BlogIcon} alt='' className={styles.menuIcon} />
							Блог
						</a>
					</div>
					<hr className={styles.hr} />
					<div>
						<a href=''>
							<img src={UserIcon} alt='' className={styles.menuIcon} />
							Вход
						</a>
					</div>
					<hr className={styles.hr} />
					<div className={styles.language} onClick={changeShowDropdown}>
						<img src={LanguageIcon} alt='' className={styles.menuIcon} />
						<span>Русский</span>
						<img
							src={arrow}
							alt=''
							className={cn(styles.arrow, {
								[styles.show]: showLanguageDropdown,
							})}
						/>
						<div
							className={cn(styles.dropdown, {
								[styles.hide]: !showLanguageDropdown,
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
				<Link to='/'>
					<img src={LogoIcon} alt='' className={styles.logo} />
				</Link>
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
					<img src={LanguageIcon} alt='' className={styles.languageIcon} />
					<span>Русский</span>
					<img
						src={arrow}
						alt=''
						className={cn(styles.arrow, {
							[styles.show]: showLanguageDropdown,
						})}
					/>
					<div
						ref={userMenuRef}
						className={cn(styles.dropdown, {
							[styles.hide]: !showLanguageDropdown,
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
				<div className={styles.userMenu}>
					<img src={UserIcon} alt='' className={styles.user} onClick={changeUserMenu} />
					<div
						ref={userMenuRef}
						className={cn(styles.userMenuDropdown, {
							[styles.hide]: !showUserMenu,
						})}
					>
						{user ? (
							<>
								<Link to={'/user/' + user}>
									<span>Личный кабинет</span>
								</Link>
								<Link to='/'>
									<span>Мои туры</span>
								</Link>
								<Link to='/'>
									<span>Мои отзывы</span>
								</Link>
								<Link to='/'>
									<span>Избранные туры</span>
								</Link>
								<Link to='/'>
									<span>Сообщения</span>
								</Link>
								<Link to='/'>
									<span>Споры</span>
								</Link>
								<br className={styles.br} />
								<div onClick={handleLogout}>
									<span>Выйти</span>
								</div>
							</>
						) : (
							<>
								<Link to='/login'>
									<span>Логин</span>
								</Link>
								<Link to='/registration'>
									<span>Регистрация</span>
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

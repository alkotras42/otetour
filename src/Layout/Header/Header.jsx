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
import LoginIcon from './images/login.svg'
import { MenuStyles } from './MenuStyle'
import arrow from './images/arrow.svg'
import cn from 'classnames'
import { slide as Menu } from 'react-burger-menu'
import { UserContext } from '../../Context/user.context'
import { getUser, logout } from '../../Api/Authorization'
import { hashids } from '../../Helpers/helpers'
import i18next from 'i18next'
import { getConfig } from '../../Api/Config'
import { useCookies } from 'react-cookie'

export const Header = ({ className, ...props }) => {
	const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)

	const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false)

	const [showUserMenu, setShowUserMenu] = useState(false)

	const [showUserMenuBurger, setShowUserMenuBurger] = useState(false)

	const [languages, setLanguages] = useState(null)

	const [cookies, setCookie, removeCookie] = useCookies(['role'])

	const userMenuRef = useRef()

	const userMenuBurgerRef = useRef()

	const { user, setUser } = useContext(UserContext)

	useEffect(() => {
		getConfig().then((res) => setLanguages(res.data.languages))
	}, [])

	// Для закрытия менюшек при нажатии вне их
	useEffect(() => {
		const checkIfClickedOutside = (e) => {
			// if (showLanguageDropdown && userMenuRef.current && !userMenuRef.current.contains(e.target)) {
			// 	setShowLanguageDropdown(false)
			// }
			if (showCurrencyDropdown && userMenuRef.current && !userMenuRef.current.contains(e.target)) {
				setShowCurrencyDropdown(false)
			}
			if (showUserMenu && userMenuRef.current && !userMenuRef.current.contains(e.target)) {
				setShowUserMenu(false)
			}
			if (changeUserMenuBurger && userMenuBurgerRef.current && !userMenuBurgerRef.current.contains(e.target)) {
				setShowUserMenuBurger(false)
			}
		}

		document.addEventListener('mousedown', checkIfClickedOutside)

		return () => {
			document.removeEventListener('mousedown', checkIfClickedOutside)
		}
	}, [showUserMenu, showLanguageDropdown, showCurrencyDropdown])

	const changeUserMenu = () => {
		setShowUserMenu((prev) => !prev)
	}

	const changeUserMenuBurger = () => {
		setShowUserMenuBurger((prev) => !prev)
	}

	const changeShowDropdown = () => {
		setShowLanguageDropdown((prev) => !prev)
	}

	const changeShowCurrencyDropdown = () => {
		setShowCurrencyDropdown((prev) => !prev)
	}

	const handleLogout = () => {
		logout()
		setUser(null)
	}

	return (
		<div className={cn(styles.header, className)} {...props}>
			<div className={styles.burgerMenu}>
				<Menu right={true} styles={MenuStyles} customBurgerIcon={<img src={MenuIcon} />}>
					<div>
						<Link to='/'>
							<img src={LogoIcon} alt='' className={styles.menuLogo} />
						</Link>
					</div>
					<div>
						<Link to=''>
							<img src={ToursIcon} alt='' className={styles.menuIcon} />
							Все туры
						</Link>
					</div>
					<div>
						<Link to=''>
							<img src={ThemesIcon} alt='' className={styles.menuIcon} />
							Туры по тематикам
						</Link>
					</div>
					<div>
						<Link to=''>
							<img src={BlogIcon} alt='' className={styles.menuIcon} />
							Блог
						</Link>
					</div>
					<hr className={styles.hr} />
					{user ? (
						<div onClick={changeUserMenuBurger} className={styles.userMenu}>
							<div>
								<img src={UserIcon} alt='' className={styles.menuIcon} />
								{user.profile.email}
							</div>
							<div
								ref={userMenuBurgerRef}
								className={cn(styles.userMenuDropdown, styles.userMenuBurger, {
									[styles.hide]: !showUserMenuBurger,
								})}
							>
								<Link to={(cookies.role ? '/guide/' : '/user/') + hashids.encode(user.profile.id)}>
									<span>Личный кабинет</span>
								</Link>
								<Link to={(cookies.role == 'guide' ? '/guide/tours/' : '/user/tours/') + hashids.encode(user.profile.id)}>
									<span>Мои туры</span>
								</Link>
								<Link to='/reviews'>
									<span>Мои отзывы</span>
								</Link>
								<Link to={'/user/favoriteTours/' + hashids.encode(user.profile.id)}>
									<span>Избранные туры</span>
								</Link>
								<Link to='/chats'>
									<span>Сообщения</span>
								</Link>
								<Link to='/disputs'>
									<span>Споры</span>
								</Link>
								<br className={styles.br} />
								<div onClick={handleLogout}>
									<span>Выйти</span>
								</div>
							</div>
						</div>
					) : (
						<div>
							<div className={styles.login}>
								<Link to='/login'>
									<img src={LoginIcon} alt='' className={styles.menuIcon} />
									Вход
								</Link>
							</div>
							<div>
								<Link to='/registration'>
									<img src={UserIcon} alt='' className={styles.menuIcon} />
									Регистрация
								</Link>
							</div>
						</div>
					)}

					<hr className={styles.hr} />
					<div className={styles.currency} onClick={changeShowCurrencyDropdown}>
						<span>₽ Рубль</span>
						<img
							src={arrow}
							alt=''
							className={cn(styles.arrow, {
								[styles.show]: showCurrencyDropdown,
							})}
						/>
						<div
							ref={userMenuRef}
							className={cn(styles.dropdown, styles.currencyDropdown, {
								[styles.hide]: !showCurrencyDropdown,
							})}
						>
							<span>₽ Рубль</span>
							<span>€ Евро</span>
							<span>$ Доллар</span>
						</div>
					</div>
					<div className={styles.language} onClick={changeShowDropdown}>
						<img src={LanguageIcon} alt='' className={styles.menuIcon} />
						<span>
							{(languages &&
								i18next.language &&
								languages[i18next.language?.toString().toUpperCase()] &&
								languages[i18next.language?.toString().toUpperCase()].name) ||
								'Русский'}
						</span>
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
							{languages &&
								Object.values(languages).map(({ name, server, image }, index) => (
									<div key={index} className={styles.languageItem}>
										<a href={`//${server}`}>
											<img src={image} alt={name} className={styles.languageItemIcon} />
											<span key={name}>{name}</span>
										</a>
									</div>
								))}
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
				<div className={styles.currency} onClick={changeShowCurrencyDropdown}>
					<span>₽ Рубль</span>
					<img
						src={arrow}
						alt=''
						className={cn(styles.arrow, {
							[styles.show]: showCurrencyDropdown,
						})}
					/>
					<div
						ref={userMenuRef}
						className={cn(styles.dropdown, styles.currencyDropdown, {
							[styles.hide]: !showCurrencyDropdown,
						})}
					>
						<span>₽ Рубль</span>
						<span>€ Евро</span>
						<span>$ Доллар</span>
					</div>
				</div>
				<div className={styles.language} onClick={changeShowDropdown}>
					<img src={LanguageIcon} alt='' className={styles.languageIcon} />
					<span>
						{(languages &&
							i18next.language &&
							languages[i18next.language?.toString().toUpperCase()] &&
							languages[i18next.language?.toString().toUpperCase()].name) ||
							'Русский'}
					</span>
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
						{languages &&
							Object.values(languages).map(({ name, server, image }, index) => (
								<div key={index} className={styles.languageItem}>
									<a href={`//${server}`}>
										<img src={image} alt={name} className={styles.languageItemIcon} />
										<span key={name}>{name}</span>
									</a>
								</div>
							))}
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
								<Link to={(cookies.role == 'guide' ? '/guide/' : '/user/') + hashids.encode(user.profile.id)}>
									<span>Личный кабинет</span>
								</Link>
								<Link to={(cookies.role == 'guide' ? '/guide/tours/' : '/user/tours/') + hashids.encode(user.profile.id)}>
									<span>Мои туры</span>
								</Link>
								<Link to='/reviews'>
									<span>Мои отзывы</span>
								</Link>
								<Link to={'/user/favoriteTours/' + hashids.encode(user.profile.id)}>
									<span>Избранные туры</span>
								</Link>
								<Link to='/chats'>
									<span>Сообщения</span>
								</Link>
								<Link to='/disputs'>
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
					{cookies.role == 'guide' && <div className={styles.guideIdicator}>Гид</div>}
				</div>
			</div>
		</div>
	)
}

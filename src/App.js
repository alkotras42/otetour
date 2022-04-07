import React, { useState, useEffect, useMemo } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Modal from 'react-modal'
import { useJwt } from 'react-jwt'
import { UserContext } from './Context/user.context'
import { getUser } from './Api/Authorization'
import { PasswordChange } from './Pages/PasswordChange/PasswordChange'
import { Registration, Login, Tour, Home } from './Pages/'
import {
	GuideProfileMain,
	GuideProfileTours,
	ProfileChats,
	ProfileDispute,
	ProfileEdit,
	ProfileMain,
	ProfileTourPay,
	ProfileTours,
} from './Pages/Profiles'
import { PrivateRoute } from './Servises/PrivateRoute'
import { logout } from './Api/Authorization'
import { NotFound } from './Pages/NotFound/NotFound'
import i18next from 'i18next'
import Cookies from 'js-cookie'
import { getConfig } from './Api/Config'

Modal.setAppElement('#root')

const App = () => {
	const [user, setUser] = useState()
	const [token, setToken] = useState({
		decodedToken: null,
		isExpired: null,
	})

	const { decodedToken, isExpired } = useJwt(user?.data?.token)

	useEffect(() => {
		setToken({ decodedToken, isExpired })

		const { profile, token } = getUser()

		if (profile) {
			setUser({ profile, token })
		}
	}, [])

	// if (user && token.isExpired) {
	// 	logout()
	// }

	const value = useMemo(() => ({ user, setUser }), [user, setUser])

	// useEffect(() => {
	// 	getConfig().then((res) => setLanguage(res.data.languages[Cookies.get('i18next').toUpperCase()]))
	// }, [])

	useEffect(() => {
		i18next.changeLanguage(window.location.host.split('.')[0].toString() || 'ru')
	}, [])

	// const language = Cookies.get('i18next') || 'ru'

	// useEffect(() => {
	// 	if (window.location.href !== 'http://localhost:3000/') {
	// 		getConfig().then((res) => window.location.replace('//' + res.data.languages[language.toUpperCase()].server))
	// 	}
	// }, [language])




	return (
		<UserContext.Provider value={value}>
			<Router>
				<Routes>
					<Route exact index path='/' element={<Home />} />
					<Route exact path='/login' element={<Login />} />
					<Route exact path='/registration' element={<Registration />} />
					<Route exact path='/passwordChange' element={<PasswordChange />} />
					<Route path='/tour/:id' element={<Tour />} />
					<Route
						path='/user/:id'
						element={
							<PrivateRoute>
								<ProfileMain />
							</PrivateRoute>
						}
					/>
					<Route
						path='/user/tours/:id'
						element={
							<PrivateRoute>
								<ProfileTours />
							</PrivateRoute>
						}
					/>
					<Route
						path='/tour/tourPay/:id'
						element={
							<PrivateRoute>
								<ProfileTourPay />
							</PrivateRoute>
						}
					/>
					<Route
						path='/edit'
						element={
							<PrivateRoute>
								<ProfileEdit />
							</PrivateRoute>
						}
					/>
					<Route
						path='/chats'
						element={
							<PrivateRoute>
								<ProfileChats />
							</PrivateRoute>
						}
					/>
					<Route
						path='/disputs'
						element={
							<PrivateRoute>
								<ProfileDispute />
							</PrivateRoute>
						}
					/>
					<Route
						path='/guide/:id'
						element={
							<PrivateRoute>
								<GuideProfileMain />
							</PrivateRoute>
						}
					/>
					<Route
						path='/guide/tours/:id'
						element={
							<PrivateRoute>
								<GuideProfileTours />
							</PrivateRoute>
						}
					/>
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Router>
		</UserContext.Provider>
	)
}

export default App

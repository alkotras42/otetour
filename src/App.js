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
	ProfileReviews,
	ProfileTourPay,
	ProfileTours,
} from './Pages/Profiles'
import { PrivateRoute } from './Servises/PrivateRoute'
import { logout } from './Api/Authorization'
import { NotFound } from './Pages/NotFound/NotFound'
import i18next from 'i18next'

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

	const value = useMemo(() => ({ user, setUser }), [user, setUser])

	useEffect(() => {
		i18next.changeLanguage(window.location.host.split('.')[0].toString() || 'ru')
	}, [])

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
						path='/reviews'
						element={
							<PrivateRoute>
								<ProfileReviews />
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

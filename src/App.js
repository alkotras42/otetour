import React, { useState, useEffect, useMemo } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Modal from 'react-modal'
import { useJwt } from 'react-jwt'
import { UserContext } from './Context/user.context'
import { getUser } from './Api/Authorization'
import { PasswordChange } from './Pages/PasswordChange/PasswordChange'
import { Registration, Login, Tour, Home, AddTrip, Trips } from './Pages/'
import {
	AddTour,
	GuideProfileEdit,
	GuideProfileMain,
	GuideProfileTours,
	ProfileChats,
	ProfileDispute,
	ProfileEdit,
	ProfileFavoriteTours,
	ProfileMain,
	ProfileReviews,
	ProfileTourPay,
	ProfileTours,
} from './Pages/Profiles'
import { PrivateRoute } from './Servises/PrivateRoute'
import { logout } from './Api/Authorization'
import { NotFound } from './Pages/NotFound/NotFound'
import { useTranslation } from 'react-i18next'
import { ErrorBoundary } from './Component'
import { getConfig } from './Api/Config'
import { QueryClient, QueryClientProvider } from 'react-query'

Modal.setAppElement('#root')

const App = () => {
	const [user, setUser] = useState()
	const [currentToken, setCurrentToken] = useState({
		token: null,
	})

	const { t, i18n } = useTranslation()

	const { decodedToken, isExpired } = useJwt(currentToken.token)

	if (decodedToken && isExpired) {
		logout()
	}

	useEffect(() => {
		const { profile, token: userToken } = getUser()
		setCurrentToken({ ...currentToken, token: userToken })

		if (profile) {
			setUser({ profile, token: userToken })
		}

		getConfig().then((res) => localStorage.setItem('config', JSON.stringify(res.data)))
	}, [])

	const value = useMemo(() => ({ user, setUser }), [user, setUser])

	useEffect(() => {
		if (window.location.origin == 'http://localhost:3000' || window.location.origin == 'https://test.otetour.com') {
			i18n.changeLanguage('ru')
		} else {
			i18n.changeLanguage(window.location.host.split('.')[0].toString())
		}
	}, [])

	const queryClient = new QueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			<ErrorBoundary>
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
								path='/user/favoriteTours/:id'
								element={
									<PrivateRoute>
										<ProfileFavoriteTours />
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
								path='/user/edit'
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
									<PrivateRoute guide={true}>
										<GuideProfileMain />
									</PrivateRoute>
								}
							/>
							<Route
								path='/guide/edit'
								element={
									<PrivateRoute guide={true}>
										<GuideProfileEdit />
									</PrivateRoute>
								}
							/>
							<Route
								path='/tour/:id/trips'
								element={
									<PrivateRoute guide={true}>
										<Trips />
									</PrivateRoute>
								}
							/>

							<Route
								path='/tour/:id/addTrip'
								element={
									<PrivateRoute guide={true}>
										<AddTrip />
									</PrivateRoute>
								}
							/>
							<Route
								path='/tour/:id/addTrip/:tripId'
								element={
									<PrivateRoute guide={true}>
										<AddTrip />
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
							<Route
								path='/guide/addTour'
								element={
									<PrivateRoute guide={true}>
										<AddTour />
									</PrivateRoute>
								}
							/>
							<Route
								path='/guide/addTour/:tourId'
								element={
									<PrivateRoute guide={true}>
										<AddTour />
									</PrivateRoute>
								}
							/>
							<Route path='*' element={<NotFound />} />
						</Routes>
					</Router>
				</UserContext.Provider>
			</ErrorBoundary>
		</QueryClientProvider>
	)
}

export default App

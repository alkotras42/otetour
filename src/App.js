import React, { useState, useEffect, useMemo } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Modal from 'react-modal'
import { useJwt } from 'react-jwt'
import { UserContext } from './Context/user.context'
import Home from './Pages/Home/Home'
import { getUser } from './Api/Authorization'
import { Login } from './Pages/Login/Login'
import { PasswordChange } from './Pages/PasswordChange/PasswordChange'
import { Registration } from './Pages/Registration/Registration'
import {
	GuideProfileMain,
	GuideProfileTours,
	ProfileChats,
	ProfileDispute,
	ProfileEdit,
	ProfileMain,
	ProfileTours,
} from './Pages/Profiles'
import { PrivateRoute } from './Servises/PrivateRoute'
import { logout } from './Api/Authorization'
import { NotFound } from './Pages/NotFound/NotFound'

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

	return (
		<UserContext.Provider value={value}>
			<Router>
				<Routes>
					<Route exact index path='/' element={<Home />} />
					<Route exact path='/login' element={<Login />} />
					<Route exact path='/registration' element={<Registration />} />
					<Route exact path='/passwordChange' element={<PasswordChange />} />
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

import React, { useState, useMemo } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserContext } from './Context/user.context'
import Home from './Pages/Home/Home'
import { Login } from './Pages/Login/Login'
import { PasswordChange } from './Pages/PasswordChange/PasswordChange'
import { Registration } from './Pages/Registration/Registration'
import { ProfileMain, ProfileTours } from './Pages/UserProfiles'
import { PrivateRoute } from './Servises/PrivateRoute'
const App = () => {
	const [user, setUser] = useState(localStorage.getItem('user'))

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
				</Routes>
			</Router>
		</UserContext.Provider>
	)
}

export default App

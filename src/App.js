import React, { useState, useMemo } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Profile from './Pages/Profile/Profile'
import { Login } from './Pages/Login/Login'
import { PasswordChange } from './Pages/PasswordChange/PasswordChange'
import { Registration } from './Pages/Registration/Registration'
import { UserContext } from './Context/user.context'

const App = () => {
	const [user, setUser] = useState(localStorage.getItem('user'))

	const value = useMemo(() => ({user, setUser}), [user, setUser])

	return (
		<UserContext.Provider value={value}>
			<Router>
				<Routes>
					<Route exact index path='/' element={<Home />} />
					<Route exact path='/login' element={<Login />} />
					<Route exact path='/registration' element={<Registration />} />
					<Route exact path='/passwordChange' element={<PasswordChange />} />
					<Route path='/user/:id' element={<Profile />} />
				</Routes>
			</Router>
		</UserContext.Provider>
	)
}

export default App

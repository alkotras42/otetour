import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Profile from './Pages/Profile/Profile'
import { Login } from './Pages/Login/Login'
import { PasswordChange } from './Pages/PasswordChange/PasswordChange'
import { Registration } from './Pages/Registration/Registration'

const App = () => {
	return (
		<Router>
			<Routes>
				<Route exact index path='/' element={<Home />} />
				<Route exact path='/login' element={<Login />} />
				<Route exact path='/registration' element={<Registration />} />
				<Route exact path='/passwordChange' element={<PasswordChange />} />
				<Route path='/user/:id' element={<Profile />} />


			</Routes>
		</Router>
	)
}

export default App

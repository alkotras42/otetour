import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Registration from './Pages/Registration/Registration'

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/registration' element={<Registration />} />
				<Route index path='/' element={<Home />} />
			</Routes>
		</Router>
	)
}

export default App

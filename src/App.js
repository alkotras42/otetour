import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Login, Registration } from './Pages'
import Home from './Pages/Home/Home'

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

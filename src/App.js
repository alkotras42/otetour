import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, Login, Registration } from './Pages'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/registration' element={<Registration/>}/>
                <Route index path='/' element={<Home/>}/>
            </Routes>
        </Router>
    )
}

export default App
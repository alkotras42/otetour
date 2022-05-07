import React from 'react'
import { useCookies } from 'react-cookie'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({ children, guide }) => {
	const [cookies, setCookie, removeCookie] = useCookies(['role'])

	if (guide) {
		if (cookies.role) {
			return children
		} else {
			return <Navigate to='/' />
		}
	}
	if (localStorage.getItem('user')) {
		return children
	} else {
		return <Navigate to='/login' />
	}
	return localStorage.getItem('user') ? children : <Navigate to='/login' />
}

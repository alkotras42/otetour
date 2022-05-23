import React from 'react'
import cn from 'classnames'
import styles from './ErrorBoundary.module.css'
import ClipLoader from 'react-spinners/ClipLoader'

export class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props)
		this.state= {
			hasError: false
		}
	}

	static getDerivedStateFromError(error) {
		return {
			hasError: true
		}
	}

	componentDidCatch(error, errorInfo) {
		console.log(error, errorInfo)
	}
	
	render () {
		if(this.state.hasError) {
			return <h1>Что-то пошло не так</h1>
		}
		return this.props.children
	}
}

import React from 'react'
import styles from './Layout.module.css'
import { Header } from './Header/Header'
import { Footer } from './Footer/Footer'

const Layout = ({ children }) => {
	return (
		<div>
			<Header></Header>
			<div className={styles.body}>{children}</div>
			<Footer></Footer>
		</div>
	)
}

export const withLayout = (Component) => {
	return function withLayoutComponent(props) {
		return (
			<Layout>
				<Component {...props} />
			</Layout>
		)
	}
}

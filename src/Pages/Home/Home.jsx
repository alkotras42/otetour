import React from 'react'
import { Header } from '../../Layout/Header/Header'
import { Footer } from '../../Layout/Footer/Footer'
import styles from './Home.module.css'
import bgImage from './bgImage.png'
import * as Components from './HomeComponents'

export const Home = () => {
	return (
		<>
			<Header />
			<img src={bgImage} alt='' className={styles.bgImage} />
			<Components.HomeHeader />
			<Components.Recomendation />
			<Components.AboutUs />
			<Components.Previou />
			<Components.CountryPick />
			<Components.Guides />
			<Components.HowItWork />
			<Components.TourTypes />
			<Components.ContinentPick />
			<Components.Follow />
			<Components.Blog />
			<Footer />
		</>
	)
}

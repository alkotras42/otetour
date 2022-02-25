import React from 'react'
import styles from './Home.module.css'
import bgImage from './bgImage.png'
import * as Components from './HomeComponents'
import { withLayout } from '../../Layout/Layout'

const Home = () => {
	return (
		<div>
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
		</div>
	)
}

export default withLayout(Home)

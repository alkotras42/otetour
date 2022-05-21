import React from 'react'
import styles from './Home.module.css'
import bgImage from './bgImage.png'
import bgImageSmall from './bgImageSmall.jpg'
import * as Components from './HomeComponents'
import { withLayout } from '../../Layout/Layout'
import { ProgressiveImg } from '../../Component'

const Home = () => {
	return (
		<div>
			<div className={styles.homeWrapper}>
				<ProgressiveImg src={bgImage} placeholderSrc={bgImageSmall} alt='bgImage' className={styles.bgImage} />
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
		</div>
	)
}

export default withLayout(Home)

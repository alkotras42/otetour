import React from 'react'
import { Header } from '../../Layout/Header/Header'
import { HomeHeader } from './HomeHeader/HomeHeader'
import styles from './Home.module.css'
import bgImage from './bgImage.png'
import { Recomendation } from './Recomendation/Recomendation'
import { AboutUs } from './AboutUs/AboutUs'
import { Previou } from './Previou/Previou'
import { CountryPick } from './CountryPick/CountryPick'
import { Guides } from './Guides/Guides'
import { HowItWork } from './HowItWork/HowItWork'
import { TourTypes } from './TourTypes/TourTypes'
import { ContinentPick } from './ContinentPick/ContinentPick'
import { Follow } from './Follow/Follow'
import { Blog } from './Blog/Blog'
import { Footer } from '../../Layout/Footer/Footer'

export const Home = () => {
	return (
		<>
			<Header />
			<img src={bgImage} alt='' className={styles.bgImage} />
			<HomeHeader />
			<Recomendation />
			<AboutUs />
			<Previou />
			<CountryPick />
			<Guides />
			<HowItWork />
			<TourTypes />
			<ContinentPick />
			<Follow />
			<Blog />
			<Footer />
		</>
	)
}

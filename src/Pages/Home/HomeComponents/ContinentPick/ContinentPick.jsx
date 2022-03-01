import React from 'react'
import cn from 'classnames'
import styles from './ContinentPick.module.css'
import AsiaImg from './images/Asia.png'
import AfricaImg from './images/Africa.png'
import AustraliaImg from './images/Australia.png'
import EuropeImg from './images/Europe.png'
import NorthAmericaImg from './images/NorthAmerica.png'
import SouthAmericaImg from './images/SouthAmerica.png'
import { Carousel } from '../../../../Component'

export const ContinentPick = ({ className, ...props }) => {
	return (
		<div className={cn(className, styles.continentPick)} {...props}>
			<span className={styles.title}>Выберите континент для путешествия</span>
			<div className={styles.continents}>
				<div className={cn(styles.continentItem, styles.asia)}>
					<img src={AsiaImg} alt='' className={styles.continentImage} />
					<span className={styles.continentTitle}>Азия</span>
				</div>
				<div className={cn(styles.continentItem, styles.africa)}>
					<img src={AfricaImg} alt='' className={styles.continentImage} />
					<span className={styles.continentTitle}>Африка</span>
				</div>
				<div className={cn(styles.continentItem, styles.australia)}>
					<img src={AustraliaImg} alt='' className={styles.continentImage} />
					<span className={styles.continentTitle}>Австралия</span>
				</div>
				<div className={cn(styles.continentItem, styles.europe)}>
					<img src={EuropeImg} alt='' className={styles.continentImage} />
					<span className={styles.continentTitle}>Европа</span>
				</div>
				<div className={cn(styles.continentItem, styles.northAmerica)}>
					<img src={NorthAmericaImg} alt='' className={styles.continentImage} />
					<span className={styles.continentTitle}>Северная Америка</span>
				</div>
				<div className={cn(styles.continentItem, styles.southAmerica)}>
					<img src={SouthAmericaImg} alt='' className={styles.continentImage} />
					<span className={styles.continentTitle}>Южная Америка</span>
				</div>
			</div>
			<div className={styles.continentsCarousel}>
				<Carousel loop={true}>
					<div className={cn(styles.continentItem, styles.asia)}>
						<img src={AsiaImg} alt='' className={styles.continentImage} />
						<span className={styles.continentTitle}>Азия</span>
					</div>
					<div className={cn(styles.continentItem, styles.africa)}>
						<img src={AfricaImg} alt='' className={styles.continentImage} />
						<span className={styles.continentTitle}>Африка</span>
					</div>
					<div className={cn(styles.continentItem, styles.australia)}>
						<img src={AustraliaImg} alt='' className={styles.continentImage} />
						<span className={styles.continentTitle}>Австралия</span>
					</div>
					<div className={cn(styles.continentItem, styles.europe)}>
						<img src={EuropeImg} alt='' className={styles.continentImage} />
						<span className={styles.continentTitle}>Европа</span>
					</div>
					<div className={cn(styles.continentItem, styles.northAmerica)}>
						<img src={NorthAmericaImg} alt='' className={styles.continentImage} />
						<span className={styles.continentTitle}>Северная Америка</span>
					</div>
					<div className={cn(styles.continentItem, styles.southAmerica)}>
						<img src={SouthAmericaImg} alt='' className={styles.continentImage} />
						<span className={styles.continentTitle}>Южная Америка</span>
					</div>
				</Carousel>
			</div>
		</div>
	)
}

import React from 'react'
import cn from 'classnames'
import styles from './ContinentPick.module.css'
import { ReactComponent as AfricaImg } from './images/Africa.svg'
import { ReactComponent as AsiaImg } from './images/Asia.svg'
import { ReactComponent as AustraliaImg } from './images/Australia.svg'
import { ReactComponent as EuropeImg } from './images/Europe.svg'
import { ReactComponent as NorthAmericaImg } from './images/NorthAmerica.svg'
import { ReactComponent as SouthAmericaImg } from './images/SouthAmerica.svg'
import { Carousel } from '../../../../Component'

export const ContinentPick = ({ className, ...props }) => {
	return (
		<div className={cn(className, styles.continentPick)} {...props}>
			<span className={styles.title}>Выберите континент для путешествия</span>
			<div className={styles.continents}>
				<div className={cn(styles.continentItem, styles.africa)}>
					<AfricaImg className={styles.continentImage} />
					<span className={styles.continentTitle}>Африка</span>
				</div>
				<div className={cn(styles.continentItem, styles.asia)}>
					<AsiaImg className={styles.continentImage} />
					<span className={styles.continentTitle}>Азия</span>
				</div>
				<div className={cn(styles.continentItem, styles.australia)}>
					<AustraliaImg className={styles.continentImage} />
					<span className={styles.continentTitle}>Австралия</span>
				</div>
				<div className={cn(styles.continentItem, styles.europe)}>
					<EuropeImg className={styles.continentImage} />
					<span className={styles.continentTitle}>Европа</span>
				</div>
				<div className={cn(styles.continentItem, styles.northAmerica)}>
					<NorthAmericaImg className={styles.continentImage} />
					<span className={styles.continentTitle}>Северная Америка</span>
				</div>
				<div className={cn(styles.continentItem, styles.southAmerica)}>
					<SouthAmericaImg className={styles.continentImage} />
					<span className={styles.continentTitle}>Южная Америка</span>
				</div>
			</div>
			<div className={styles.continentsCarousel}>
				<Carousel loop={true} itemsCount={3}>
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

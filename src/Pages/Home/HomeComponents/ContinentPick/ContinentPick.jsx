import React from 'react'
import cn from 'classnames'
import styles from './ContinentPick.module.css'
import { ReactSVG } from 'react-svg'
import { Carousel } from '../../../../Component'

export const ContinentPick = ({ className, ...props }) => {
	return (
		<div className={cn(className, styles.continentPick)} {...props}>
			<span className={styles.title}>Выберите континент для путешествия</span>
			<div className={styles.continents}>
				<div className={cn(styles.continentItem, styles.asia)}>
					<ReactSVG
						afterInjection={(_err, svg) => {
							svg.classList.add(styles.continentImage)
						}}
						src='/images/Asia.svg'
					/>
					<span className={styles.continentTitle}>Азия</span>
				</div>
				<div className={cn(styles.continentItem, styles.africa)}>
					<ReactSVG
						afterInjection={(_err, svg) => {
							svg.classList.add(styles.continentImage)
						}}
						src='/images/Africa.svg'
					/>
					<span className={styles.continentTitle}>Африка</span>
				</div>
				<div className={cn(styles.continentItem, styles.australia)}>
					<ReactSVG
						afterInjection={(_err, svg) => {
							svg.classList.add(styles.continentImage)
						}}
						src='/images/Australia.svg'
					/>
					<span className={styles.continentTitle}>Австралия</span>
				</div>
				<div className={cn(styles.continentItem, styles.europe)}>
					<ReactSVG
						afterInjection={(_err, svg) => {
							svg.classList.add(styles.continentImage)
						}}
						src='/images/Europe.svg'
					/>
					<span className={styles.continentTitle}>Европа</span>
				</div>
				<div className={cn(styles.continentItem, styles.northAmerica)}>
					<ReactSVG
						afterInjection={(_err, svg) => {
							svg.classList.add(styles.continentImage)
						}}
						src='/images/NorthAmerica.svg'
					/>
					<span className={styles.continentTitle}>Северная Америка</span>
				</div>
				<div className={cn(styles.continentItem, styles.southAmerica)}>
					<ReactSVG
						afterInjection={(_err, svg) => {
							svg.classList.add(styles.continentImage)
						}}
						src='/images/SouthAmerica.svg'
					/>
					<span className={styles.continentTitle}>Южная Америка</span>
				</div>
			</div>
			<div className={styles.continentsCarousel}>
				<Carousel loop={true} itemsCount={3}>
					<div className={cn(styles.continentItem, styles.asia)}>
						<ReactSVG
							afterInjection={(_err, svg) => {
								svg.classList.add(styles.continentImage)
							}}
							src='/images/Asia.svg'
						/>
						<span className={styles.continentTitle}>Азия</span>
					</div>
					<div className={cn(styles.continentItem, styles.africa)}>
						<ReactSVG
							afterInjection={(_err, svg) => {
								svg.classList.add(styles.continentImage)
							}}
							src='/images/Africa.svg'
						/>
						<span className={styles.continentTitle}>Африка</span>
					</div>
					<div className={cn(styles.continentItem, styles.australia)}>
						<ReactSVG
							afterInjection={(_err, svg) => {
								svg.classList.add(styles.continentImage)
							}}
							src='/images/Australia.svg'
						/>
						<span className={styles.continentTitle}>Австралия</span>
					</div>
					<div className={cn(styles.continentItem, styles.europe)}>
						<ReactSVG
							afterInjection={(_err, svg) => {
								svg.classList.add(styles.continentImage)
							}}
							src='/images/Europe.svg'
						/>
						<span className={styles.continentTitle}>Европа</span>
					</div>
					<div className={cn(styles.continentItem, styles.northAmerica)}>
						<ReactSVG
							afterInjection={(_err, svg) => {
								svg.classList.add(styles.continentImage)
							}}
							src='/images/NorthAmerica.svg'
						/>
						<span className={styles.continentTitle}>Северная Америка</span>
					</div>
					<div className={cn(styles.continentItem, styles.southAmerica)}>
						<ReactSVG
							afterInjection={(_err, svg) => {
								svg.classList.add(styles.continentImage)
							}}
							src='/images/SouthAmerica.svg'
						/>
						<span className={styles.continentTitle}>Южная Америка</span>
					</div>
				</Carousel>
			</div>
		</div>
	)
}

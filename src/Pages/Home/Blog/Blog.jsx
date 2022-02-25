import React from 'react'
import cn from 'classnames'
import { BlogCard } from '../../../Component'
import styles from './Blog.module.css'
import Arrow from './arrow.svg'

export const Blog = ({ className, ...props }) => {
	const card_data = {
		title: 'Самые красивые места России',
		date: '11.05.2021',
		img: 'images/blogImg1.png',
	}
	return (
		<div className={cn(className, styles.blog)} {...props}>
			<span className={styles.title}>Наш блог</span>
			<p className={styles.more}>
			Еще больше интересного <img src={Arrow} alt='' className={styles.arrow}/>
			</p>
			<div className={styles.blogs}>
				<BlogCard card={card_data} />
				<BlogCard card={card_data} />
				<BlogCard card={card_data} />
				<BlogCard card={card_data} />
			</div>
		</div>
	)
}

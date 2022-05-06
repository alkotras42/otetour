import React from 'react'
import cn from 'classnames'
import styles from './Loading.module.css'
import ClipLoader from 'react-spinners/ClipLoader'

export const Loading = ({ className, ...props }) => {
	return (
		<div className={cn(className, styles.loadingWrapper)} {...props}>
			<div className={styles.loadingContainer}>
				<ClipLoader color='#63A583' />
			</div>
		</div>
	)
}

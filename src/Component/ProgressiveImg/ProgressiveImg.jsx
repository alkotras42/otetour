import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './ProgressiveImg.module.css'
import DiffIcon from './DiffIcon.svg'

export const ProgressiveImg = ({ className, placeholderSrc, src, ...props }) => {
	const [imgSrc, setImgSrc] = useState(placeholderSrc || src)

	useEffect(() => {
		const img = new Image()
		img.src = src
		img.onload = () => {
			setImgSrc(src)
		}
	}, [src])

	const customClass = placeholderSrc && imgSrc === placeholderSrc ? styles.loading : styles.loaded

	return <img {...{ src: imgSrc, ...props }} alt={props.alt || ''} className={cn(className, customClass)} />
}

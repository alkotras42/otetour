import React, { useState } from 'react'
import cn from 'classnames'
import styles from './Input.module.css'
import EyeIcon from './Eye.svg'
import CloseEyeIcon from './closeEye.svg'

export const Input = ({ className, type, ...props }) => {

  const [showPassword, setShowPassword] = useState(type === 'password' ? false : true)

  const changeType = () => {
    setShowPassword(!showPassword)
  }

	return (
		<div className={styles.wrapper}>
			<input type={showPassword ? 'text' : 'password'} className={cn(className, styles.input)} {...props} />
			{type == 'password' && <img src={showPassword ? CloseEyeIcon : EyeIcon} alt='' className={styles.eye} onClick={changeType} />}
		</div>
	)
}

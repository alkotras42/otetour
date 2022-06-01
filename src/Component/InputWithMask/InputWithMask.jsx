import React, { forwardRef } from 'react'
import cn from 'classnames'
import styles from './InputWithMask.module.css'
import CurrencyFormat from 'react-currency-format'
import { Input } from '../Input/Input'
export const InputWithMask = forwardRef(({ className, ...props }, ref) => {
	return <CurrencyFormat customInput={Input} className={cn(className)} {...props} ref={ref} />
})

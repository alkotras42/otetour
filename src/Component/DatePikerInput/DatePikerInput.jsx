import React, { forwardRef, useState } from 'react'
import cn from 'classnames'
import ReactDatePicker from 'react-datepicker'
import { Input } from '../Input/Input'
import {ru} from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'

export const DatePikerInput = forwardRef(({ selected, onChange, placeholderText, ...props }, ref) => {
	return (
		<ReactDatePicker
			dateFormat='yyyy-MM-dd'
			locale={ru}
			minDate={new Date()}
			onChangeRaw={(e) => e.preventDefault()}
			customInput={<Input ref={ref} {...props} />}
			placeholderText={placeholderText}
			selected={selected}
			onChange={onChange}
		/>
	)
})

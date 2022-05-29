import React, { useState } from 'react'
import { Button, Input, TextArea } from '../../../../../Component'
import styles from '../AddTour.module.css'
import cn from 'classnames'
import PlusIcon from '../plusIcon.svg'
import PhotoIcon from '../photo.svg'
import { useFieldArray, useFormState, useWatch } from 'react-hook-form'
import CloseIcon from '../closeIcon.svg'

const FifthStep = ({ className, control, register, formStep, setFormStep, ...props }) => {



	const addQuestion = () => {
		questionsAppend({})
	}

	const prevStep = (e) => {
		e.preventDefault()
		setFormStep((prev) => prev - 1)
		document.documentElement.scrollTop = 0
	}

	return (
		<div className={className} {...props}>

			<div>
				
			</div>
		</div>
	)
}

export default FifthStep

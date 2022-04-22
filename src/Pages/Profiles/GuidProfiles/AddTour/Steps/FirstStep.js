import React, { forwardRef, useState } from 'react'
import { Input } from '../../../../../Component'
import styles from '../AddTour.module.css'
import cn from 'classnames'
import { useFieldArray, useWatch, Controller } from 'react-hook-form'

const DiffPiker = forwardRef(({ value, setValue }, ref) => {
	return (
		<div className={styles.difficulty}>
			<span>Сложность тура</span>
			<div ref={ref} className={styles.diffContainer}>
				{[...Array(5).keys()].map((item, i) => (
					<div
						onClick={() => setValue(i + 1)}
						className={cn(styles.diffItem, {
							[styles.activeItem]: value == i,
						})}
						key={i}
					>
						{i + 1}
					</div>
				))}
			</div>
		</div>
	)
})

const FirstStep = ({ className, register, control, ...props }) => {
	const value = useWatch({
		control,
	})

	console.log(value)

	return (
		<div className={className} {...props}>
			<Input placeholder='Название' {...register('title')} filled={value.title} />
			<Input placeholder='Тип тура' {...register('type')} filled={value.type} />
			<p className={styles.blockTitle}>Краткая информация</p>
			<p>
				Оцените сложность тура по системе от 1 до 5, где 1 — очень легко, 5 — очень сложно. Поставьте примерный возраст
				участия, исходя из сложности тура и возрастных ограничений.
			</p>
			<Input placeholder='Страна' {...register('country')} filled={value.country} />
			<Input placeholder='Регион' {...register('region')} filled={value.region} />
			<Input placeholder='Город' {...register('city')} filled={value.city} />
			<div className={styles.twoInputs}>
				<Input placeholder='Длительность тура' {...register('tourLength')} filled={value.tourLength} />
				<Input placeholder='Размер группы' {...register('groupSize')} filled={value.groupSize} />
			</div>
			<Input placeholder='Язык группы' {...register('groupLanguage')} filled={value.groupLanguage} />
			<Input placeholder='Стоимость тура' {...register('tourPrice')} filled={value.tourPrice} />
			<p>
				*Комиссия за использование платформы составит <span className={styles.redSpan}>1 250 ₽</span> за каждого туриста,
				купившего этот тур.
			</p>
			<Controller
				render={({ field }) => <DiffPiker value={field.value} setValue={field.onChange} />}
				name='difficulty'
				control={control}
				defaultValue=''
			/>

			<div className={styles.ages}>
				<p>Возраст участия</p>
				<div className={styles.twoInputs}>
					<Input placeholder='От' {...register('ageFrom')} filled={value.ageFrom} />
					<Input placeholder='До' {...register('ageTo')} filled={value.ageTo} />
				</div>
			</div>
		</div>
	)
}

export default FirstStep

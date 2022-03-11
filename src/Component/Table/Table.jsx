import React from 'react'
import cn from 'classnames'
import styles from './Table.module.css'
import { priceRu } from '../../Helpers/helpers'

export const Table = ({ className, type, data, ...props }) => {
	let headers = []

	switch (type) {
		case ('partner', 'tourist'):
			headers = ['Дата', 'Турист', 'Купленный тур', 'Стоимость тура', 'Ваш процент', 'Статус начисления']
			break
		case 'subagent':
			headers = ['Дата', 'Субагент', 'Тур', 'Стоимость тура', 'Ваш процент', 'Статус начисления']
			break
		case 'guide':
			headers = ['Дата', 'Гид', 'Проданный тур', 'Стоимость тура', 'Ваш процент', 'Статус начисления']
			break
	}

	return (
		<table className={className} {...props}>
			<tbody>
				<tr>
					{headers.map((head) => (
						<th>{head}</th>
					))}
				</tr>
				{data.map((row) => (
					<tr>
						{Object.values(row).map((cell) => (
							<td>{Number.isInteger(cell) ? priceRu(cell) : cell}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
}
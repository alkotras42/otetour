export const priceRu = (price) =>
	price
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
		.concat(' ₽')

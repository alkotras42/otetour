import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button, Difficulty, Rating } from '../../Component'
import { withLayout } from '../../Layout/Layout'
import cn from 'classnames'
import styles from './Tour.module.css'
import ArrowIcon from './arrow.svg'
import { priceRu } from '../../Helpers/helpers'

const Tour = () => {
	const [activeDay, setActiveDay] = useState(0)

	const [activeDate, setActiveDate] = useState(1)

	const [personCount, setPersonCount] = useState(1)

	const [activeInfoItem, setActiveInfoItem] = useState(0)

	const [activeQuestion, setActiveQuestion] = useState(0)

	// const [tour, setTour] = useState(null)

	// const params = useParams()

	// const navigate = useNavigate()

	// useEffect(() => {
	// 	getUserById(hashids.decode(params.id)).then((res) => {
	// 		if (res.data.data) {
	// 			setTour(res.data)
	// 		} else {
	// 			navigate('/404')
	// 		}
	// 	})
	// }, [])

	const incrementCounter = () => {
		if (personCount < tourData.remainPlases) {
			setPersonCount((prev) => prev + 1)
		}
	}

	const derementCounter = () => {
		if (personCount > 1) {
			setPersonCount((prev) => prev - 1)
		}
	}

	const tourData = {
		id: '1',
		owner_id: '0',
		country_id: '489',
		category_id: '1',
		language_id: '489',
		name: 'Путешествие по винодельням и виноградникам',
		length: '5',
		size: '20',
		remainPlases: '7',
		dates: [
			{
				dateStart: '20 июня',
				dateEnd: '27 июня',
			},
			{
				dateStart: '10 мая',
				dateEnd: '18 мая',
			},
		],
		price: '20000.00',
		price_discount: '0.00',
		rate: '0.0',
		votes_count: '0',
		difficulty: '2',
		age_min: '13',
		images: ['https://media.otetour.com/cardImg2.png', 'https://media.otetour.com/cardImg1.png'],
		category: 'Фитнес-тур',
		place: 'Карелия',
		reviews: [
			{
				author: 'Ольга',
				date: '29 января 2019',
				raring: '4',
				body:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, delectus aut molestias reiciendis deserunt porro commodi corrupti vel voluptates pariatur.',
			},
			{
				author: 'Константин',
				date: '29 января 2019',
				raring: '3',
				body:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, delectus aut molestias reiciendis deserunt porro commodi corrupti vel voluptates pariatur.',
			},
			{
				author: 'Кирилл',
				date: '29 января 2019',
				raring: '5',
				body:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, delectus aut molestias reiciendis deserunt porro commodi corrupti vel voluptates pariatur.',
			},
		],
		program: [
			{
				image: 'https://media.otetour.com/cardImg2.png',
				description:
					'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto voluptas ea minima rem veniam recusandae. Voluptatibus, sint? Velit sit excepturi, asperiores quasi ullam possimus voluptates recusandae eum vel aliquam! Molestias aliquam reprehenderit nisi aspernatur voluptatem repellat tenetur amet fugiat. Molestias.',
			},
			{
				image: 'https://media.otetour.com/cardImg1.png',
				description:
					'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos rem incidunt deleniti veritatis mollitia beatae error commodi nulla magni. Fugiat nesciunt possimus veniam nisi tenetur labore vero, hic magnam alias. Quibusdam praesentium minima quaerat voluptates veritatis dolorum cum facilis vero pariatur ipsum. Illo repudiandae, natus nihil pariatur dignissimos est facilis esse culpa ullam et ex in autem minus ut asperiores ratione. Ullam explicabo, expedita id, dolores obcaecati corporis quo libero cum veniam doloribus eius tempora quibusdam numquam error fugit asperiores beatae maxime, sunt nesciunt dolor dicta enim in. Expedita earum impedit perspiciatis necessitatibus dolorum porro, dolore nobis, obcaecati vitae cum deleniti, praesentium nulla tenetur minima nam et accusamus velit tempora sint. Deserunt expedita nisi sequi labore iure, adipisci nesciunt. Expedita!',
			},
			{
				image: 'https://media.otetour.com/cardImg2.png',
				description:
					'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint nulla, delectus illum distinctio eum ratione eius est quaerat pariatur cumque.',
			},
			{
				image: 'https://media.otetour.com/cardImg2.png',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti obcaecati repellendus sunt corporis alias commodi, ipsa sapiente perferendis, cum amet delectus fugiat, reprehenderit voluptatum provident odit maxime nemo quo! Impedit.',
			},
		],
		importantInfo: [
			{
				title: 'В стоимость входит',
				body: ['Lorem ipsum dolor sit amet.', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.'],
			},
			{
				title: 'В стоимость не входит',
				body: ['Lorem ipsum dolor sit amet.', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.'],
			},
			{
				title: 'Дополнительные услуги',
				body: ['Lorem ipsum dolor sit amet.', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.'],
			},
			{
				title: 'Требования к туристам',
				body: ['Lorem ipsum dolor sit amet.', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.'],
			},
		],
		questions: [
			'Ответ на вопрос. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque sint magnam dolor ex asperiores ab consectetur repudiandae optio omnis quos?',
			'Ответ на вопрос. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna malesuada a purus consectetur nunc. Morbi a ornare arcu non et sit amet diam. Aliquam posuere ultrices varius ac ut amet.',
			'Ответ на вопрос. Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, sunt..',
		],
		language_code: 'RU',
		language: 'Русский',
		country_code: 'RU',
		country: 'Россия',
	}

	return (
		<div className={styles.tour}>
			{false ? (
				<div>Loading...</div>
			) : (
				<div className={styles.tourWrapper}>
					<div className={styles.breadcrumbs}>
						<Link to='/'>Главная</Link> / Туры в индию / {tourData.name}
					</div>
					<div className={styles.tourContainer}>
						<div className={styles.tourMain}>
							<p className={styles.type}>{tourData.category} </p>
							<p className={styles.title}>{tourData.name}</p>
							<div className={styles.tourTopData}>
								<div className={styles.images}>
									<img src={tourData.images[0]} alt='' />
								</div>
								<div className={styles.mainInfo}>
									<span>Место путешествия</span>
									{`${tourData.place}, ${tourData.country}`}
									<span>Длительность</span>
									{tourData.length}
									<span>Размер группы</span>
									{tourData.size}
									<span>Возраст</span>
									{`От ${tourData.age_min} лет`}
									<span>Сложность</span>
									<Difficulty difficulty={tourData.difficulty} />
									<span>Язык группы</span>
									{tourData.language}
								</div>
							</div>
							<p className={styles.description}>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus sit, nostrum quod corporis magnam quo
								maiores quia ratione adipisci minima aspernatur fugiat. Incidunt dolorum ratione odit adipisci ipsam quasi rerum
								perferendis, nostrum dolores harum. Explicabo, molestias ad hic eum voluptates corporis eius fugit ipsam error
								dolor cupiditate consequatur debitis molestiae totam delectus excepturi nemo animi. Incidunt voluptas molestias,
								sed consectetur facere qui reprehenderit magnam obcaecati quidem dolorum maxime magni dicta!
							</p>
							<div className={styles.program}>
								<p className={styles.title}>Подробная программа</p>
								{tourData.program.map((day, i) => (
									<div
										className={cn(styles.day, {
											[styles.activeDay]: activeDay == i,
										})}
										onClick={() => setActiveDay(i)}
									>
										<div className={styles.dayHeader}>
											<p className={styles.dayNumber}>{`${i + 1} день `}</p>
											<img src={ArrowIcon} alt='' className={styles.dayArrow} />
										</div>
										<div className={styles.dayInfo}>
											<img className={styles.programImage} src={day.image} alt='' />
											<p>{day.description}</p>
										</div>
									</div>
								))}
							</div>
							<div className={styles.aboutPlace}>
								<p className={styles.title}>Проживание</p>
								<div className={styles.aboutPlaceInfo}>
									<p className={styles.aboutPlaceBody}>
										Описание места проживания. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in tellus
										cursus metus leo ullamcorper tincidunt semper morbi. Nisl ac sit aliquet diam. Convallis risus blandit vivamus
										amet a. Dui maecenas in sapien hendrerit turpis tortor vel. Leo, mauris vestibulum, cursus vitae est cursus
										enim.
									</p>
									<img src='/images/cardImg2.png' alt='' className={styles.aboutPlaceImg} />
								</div>
							</div>
							<div className={styles.importantInfo}>
								<p className={styles.title}>Важная информация</p>
								{tourData.importantInfo.map((item, i) => (
									<div
										className={cn(styles.infoItem, {
											[styles.activeInfoItem]: i == activeInfoItem,
										})}
										onClick={() => setActiveInfoItem(i)}
									>
										<div className={styles.importantInfoHeader}>
											<div className={styles.importantInfoTitle}>{item.title}</div>
											<img src={ArrowIcon} alt='' className={styles.importantInfoArrow} />
										</div>
										<div className={styles.importantInfoBody}>
											<ul>
												{item.body.map((l) => (
													<li>{l}</li>
												))}
											</ul>
										</div>
									</div>
								))}
							</div>
							<div className={styles.aboutGuide}>
								<p className={styles.title}>Гид</p>
								<div className={styles.aboutGuideInfo}>
									<img src='/images/guideImg1.png' alt='' className={styles.aboutGuideImg} />
									<div>
										<p className={styles.aboutGuideName}>Иван</p>
										<p className={styles.aboutGuideBody}>
											Описание места проживания. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in tellus
											cursus metus leo ullamcorper tincidunt semper morbi. Nisl ac sit aliquet diam. Convallis risus blandit
											vivamus amet a. Dui maecenas in sapien hendrerit turpis tortor vel. Leo, mauris vestibulum, cursus vitae est
											cursus enim.
										</p>
									</div>
								</div>
								<Button className={styles.aboutGuideButton}>Задать вопрос гиду</Button>
							</div>
							<div className={styles.reviews}>
								<p className={styles.title}>Отзывы</p>
								<div className={styles.reviewsContent}>
									{tourData.reviews.map((review) => (
										<div className={styles.reviewItem}>
											<div className={styles.reviewItemHeader}>
												<div>
													<span className={styles.reviewAuthor}>{review.author}</span>
													<span className={styles.reviewDate}>{review.date}</span>
												</div>
												<div>
													<Rating rating={review.raring} />
												</div>
											</div>
											<p className={styles.reviewBody}>{review.body}</p>
										</div>
									))}
								</div>
								<p className={styles.more}>Больше отзывов</p>
							</div>
							<div className={styles.flights}>
								<p className={styles.flightsText}>Подобрать авиабилеты</p>
								<Button className={styles.flightsButton}>Просмотреть</Button>
							</div>
							<div className={styles.questions}>
								<p className={styles.title}>Часто задаваемые вопросы</p>
								<div className={styles.questionContent}>
									{tourData.questions.map((question, i) => (
										<div
											className={cn(styles.questionItem, {
												[styles.activeQuestionItem]: i == activeQuestion,
											})}
											onClick={() => setActiveQuestion(i)}
										>
											<div className={styles.questionHeader}>
												<div className={styles.questionTitle}>{`${i + 1} вопрос`}</div>
												<img src={ArrowIcon} alt='' className={styles.questionArrow} />
											</div>
											<p className={styles.questionBody}>{question}</p>
										</div>
									))}
								</div>
							</div>
						</div>
						<div className={styles.right}>
							<div className={styles.tourReserve}>
								<div className={styles.reserveInfo}>
									<div className={styles.infoLine}>
										<span>Количество человек</span>
										<div className={styles.personCounter}>
											<div className={styles.personButton} onClick={derementCounter}>
												-
											</div>
											<div>{personCount}</div>
											<div className={styles.personButton} onClick={incrementCounter}>
												+
											</div>
										</div>
									</div>
									<div className={styles.infoLine}>
										<span>Даты</span>
										<div className={styles.infoDates}>
											{`${tourData.dates[activeDate].dateStart} - ${tourData.dates[activeDate].dateEnd}`}
											<div>
												<img src={ArrowIcon} alt='' />
											</div>
										</div>
									</div>
									<div className={cn(styles.infoLine, styles.reservePlases)}>
										<span>{`Осталось ${tourData.remainPlases} из ${tourData.size} мест`}</span>
										<div className={styles.reservePrice}>{priceRu(Math.floor(tourData.price))}</div>
									</div>
								</div>
								<Button className={styles.reserveButton}>Забронировать тур</Button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default withLayout(Tour)

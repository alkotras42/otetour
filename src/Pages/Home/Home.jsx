import React from 'react'
import { Header } from '../../Layout/Header/Header'
import { HomeHeader } from './HomeHeader/HomeHeader'
import styles from './Home.module.css'
import bgImage from './bgImage.png'
import './Home.css'
import { Card } from '../../Component'
import { Recomendation } from './Recomendation/Recomendation'
import { AboutUs } from './AboutUs/AboutUs'
import { Previou } from './Previou/Previou'
import { CountryPick } from './CountryPick/CountryPick'
import { Guides } from './Guides/Guides'
import { HowItWork } from './HowItWork/HowItWork'
import { TourTypes } from './TourTypes/TourTypes'
import { ContinentPick } from './ContinentPick/ContinentPick'
import { Follow } from './Follow/Follow'

export const Home = () => {
	return (
		<div className='wrapper'>
			<div className={styles.header}>
				<Header />
				<img src={bgImage} alt='' className={styles.bgImage} />
				<HomeHeader />
			</div>

			<div className={styles.main}>
				<Recomendation />
				<AboutUs />
				<Previou />
				<CountryPick />
				<Guides />
				<HowItWork />
				<TourTypes />
				<ContinentPick/>
				<Follow/>
				<section className='our-blog'>
					<div className='container'>
						<div className='row'>
							<div className='col-lg-12 title'>
								<h2>Наш блог</h2>
							</div>
							<div className='col-lg-12 more'>
								<a href='#!'>
									Еще больше интересного <img src='images/link-arrow.svg' alt='' />
								</a>
							</div>
						</div>
						<div className='row'>
							<div className='col-lg-3 col-md-6 col-sm-6'>
								<a href='#!' className='blog-block'>
									<div className='blog-img'>
										<img src='images/blog-img1.png' alt='' />
									</div>
									<div className='blog-text'>
										<span className='blog-date'>11.05.2021</span>
										<h5>Самые красивые места России</h5>
									</div>
								</a>
							</div>
							<div className='col-lg-3 col-md-6 col-sm-6'>
								<a href='#!' className='blog-block'>
									<div className='blog-img'>
										<img src='images/blog-img2.png' alt='' />
									</div>
									<div className='blog-text'>
										<span className='blog-date'>07.05.2021</span>
										<h5>Какие страны уже открыли границы?</h5>
									</div>
								</a>
							</div>
							<div className='col-lg-3 col-md-6 col-sm-6'>
								<a href='#!' className='blog-block'>
									<div className='blog-img'>
										<img src='images/blog-img3.png' alt='' />
									</div>
									<div className='blog-text'>
										<span className='blog-date'>29.04.2021</span>
										<h5>Куда поехать в июле?</h5>
									</div>
								</a>
							</div>
							<div className='col-lg-3 col-md-6 col-sm-6'>
								<a href='#!' className='blog-block'>
									<div className='blog-img'>
										<img src='images/blog-img4.png' alt='' />
									</div>
									<div className='blog-text'>
										<span className='blog-date'>20.04.2021</span>
										<h5>Путешествие по Европе</h5>
									</div>
								</a>
							</div>
						</div>
					</div>
				</section>
			</div>

			<footer className='footer'>
				<div className='container'>
					<div className='row'>
						<div className='col-lg-3 col-md-6 one'>
							<div className='ftr-menu'>
								<p>Для путешествеников</p>
								<a href='#!'>Что такое авторские туры</a>
								<a href='#!'>Индивидуальные туры</a>
								<a href='#!'>Континентальные туры</a>
								<a href='#!'>Тематические туры</a>
								<a href='#!'>Оплата</a>
								<a href='#!'>Почему O.T.E.TOUR</a>
								<a href='#!'>Как устроен сервис</a>
								<a href='#!'>Связаться с нами</a>
							</div>
						</div>
						<div className='col-lg-3 col-md-6 two'>
							<div className='ftr-menu'>
								<p>O.T.E.TOUR</p>
								<a href='#!'>О нас</a>
								<a href='#!'>Вакансии</a>
								<a href='#!'>Отзывы путешественников</a>
								<a href='#!'>Условия и положения (публичная оферта)</a>
								<a href='#!'>Конфиденциальность</a>
								<a href='#!'>Конфиденциальность</a>
								<a href='#!'>Политика использования файлов cookie</a>
							</div>
						</div>
						<div className='col-lg-3 col-md-6 three'>
							<div className='ftr-menu'>
								<p>Гидам</p>
								<a href='#!'>Условия сотрудничества</a>
								<a href='#!'>Как начать работу</a>
								<a href='#!'>Регистрация</a>
								<a href='#!'>Связаться с нами</a>
							</div>
						</div>
						<div className='col-lg-3 col-md-6 four'>
							<div className='ftr-menu'>
								<p>Партнёрам</p>
								<a href='#!'>Партнерская программа</a>
								<a href='#!'>Партнёрские отношения</a>
								<a href='#!'>Связаться с нами</a>
							</div>
						</div>
					</div>
				</div>
				<div className='container-fluid ftr-con'>
					<div className='container'>
						<div className='row'>
							<div className='col-lg-12 ftr-col'>
								<div className='ftr-sub'>
									<div className='ftr-left'>
										<p>© 2021 OTE TOUR</p>
									</div>
									<div className='ftr-center'>
										<p>Остались вопросы?</p>
										<a href='#!'>Связаться с нами </a>
									</div>
									<div className='ftr-right'>
										<a href='#!'>
											<img src='images/insta.svg' alt='' />
										</a>
										<a href='#!'>
											<img src='images/vk.svg' alt='' />
										</a>
										<a href='#!'>
											<img src='images/facebook.svg' alt='' />
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>
			<script src='js/jquery-3.3.1.min.js'></script>
			<script src='libs/bootstrap4/bootstrap.min.js'></script>
			<script src='js/owl.carousel.min.js'></script>
			<script src='js/script.js'></script>
		</div>
	)
}

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

export const Home = () => {
	return (
		<div className='wrapper'>
			<div className={styles.header}>
				<Header />
				<img src={bgImage} alt='' className={styles.bgImage} />
				<HomeHeader />
			</div>

			<div className={styles.main}>
				<Recomendation/>
				<AboutUs/>
				<Previou/>
				<CountryPick/>
				<Guides/>
				<HowItWork/>

				<section className='choose-tour'>
					<div className='container'>
						<div className='row'>
							<div className='col-lg-12 title'>
								<h2>Выбирайте тур по своим интересам</h2>
							</div>
						</div>
						<div className='row'>
							<div className='col-lg-3 col-md-3 col-sm-6 tour-col'>
								<div className='tour-block'>
									<div className='tour-img'>
										<img src='images/tour-img1.png' alt='' />
									</div>
									<div className='tour-text'>
										<p>Конные туры</p>
									</div>
									<div className='hover-text'>
										<p>У нас есть еще больше тематик на любой вкус</p>
										<a href='#!'>
											Посмотреть <img src='images/arrow-right.png' alt='' />
										</a>
									</div>
								</div>
							</div>
							<div className='col-lg-3 col-md-3 col-sm-6 tour-col'>
								<div className='tour-block'>
									<div className='tour-img'>
										<img src='images/tour-img2.png' alt='' />
									</div>
									<div className='tour-text'>
										<p>Винные туры</p>
									</div>
									<div className='hover-text'>
										<p>У нас есть еще больше тематик на любой вкус</p>
										<a href='#!'>
											Посмотреть <img src='images/arrow-right.png' alt='' />
										</a>
									</div>
								</div>
							</div>
							<div className='col-lg-3 col-md-3 col-sm-6 tour-col'>
								<div className='tour-block'>
									<div className='tour-img'>
										<img src='images/tour-img3.png' alt='' />
									</div>
									<div className='tour-text'>
										<p>Водные туры</p>
									</div>
									<div className='hover-text'>
										<p>У нас есть еще больше тематик на любой вкус</p>
										<a href='#!'>
											Посмотреть <img src='images/arrow-right.png' alt='' />
										</a>
									</div>
								</div>
							</div>
							<div className='col-lg-3 col-md-3 col-sm-6 tour-col'>
								<div className='tour-block'>
									<div className='tour-img'>
										<img src='images/tour-img4.png' alt='' />
									</div>
									<div className='tour-text'>
										<p>Яхт-туры</p>
									</div>
									<div className='hover-text'>
										<p>У нас есть еще больше тематик на любой вкус</p>
										<a href='#!'>
											Посмотреть <img src='images/arrow-right.png' alt='' />
										</a>
									</div>
								</div>
							</div>

							<div className='col-lg-3 col-md-3 col-sm-6 tour-col'>
								<div className='tour-block'>
									<div className='tour-img'>
										<img src='images/tour-img5.png' alt='' />
									</div>
									<div className='tour-text'>
										<p>Горнолыжные туры</p>
									</div>
									<div className='hover-text'>
										<p>У нас есть еще больше тематик на любой вкус</p>
										<a href='#!'>
											Посмотреть <img src='images/arrow-right.png' alt='' />
										</a>
									</div>
								</div>
							</div>
							<div className='col-lg-3 col-md-3 col-sm-6 tour-col'>
								<div className='tour-block'>
									<div className='tour-img'>
										<img src='images/tour-img6.png' alt='' />
									</div>
									<div className='tour-text'>
										<p>Танцевальные туры</p>
									</div>
									<div className='hover-text'>
										<p>У нас есть еще больше тематик на любой вкус</p>
										<a href='#!'>
											Посмотреть <img src='images/arrow-right.png' alt='' />
										</a>
									</div>
								</div>
							</div>
							<div className='col-lg-3 col-md-3 col-sm-6 tour-col'>
								<div className='tour-block'>
									<div className='tour-img'>
										<img src='images/tour-img7.png' alt='' />
									</div>
									<div className='tour-text'>
										<p>Психологические туры</p>
									</div>
									<div className='hover-text'>
										<p>У нас есть еще больше тематик на любой вкус</p>
										<a href='#!'>
											Посмотреть <img src='images/arrow-right.png' alt='' />
										</a>
									</div>
								</div>
							</div>
							<div className='col-lg-3 col-md-3 col-sm-6 tour-col'>
								<div className='tour-block'>
									<div className='tour-img'>
										<img src='./images/tour-img8.png' alt='' />
									</div>
									<div className='tour-text'>
										<p>Яхт-туры</p>
									</div>
									<div className='hover-text'>
										<p>У нас есть еще больше тематик на любой вкус</p>
										<a href='#!'>
											Посмотреть <img src='images/arrow-right.png' alt='' />
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className='choose-country'>
					<div className='container'>
						<div className='row'>
							<div className='col-lg-12 title'>
								<h2>Выберите континент для путешествия</h2>
							</div>
						</div>
						<div className='row'>
							<div className='col-lg-12'>
								<div className='selCont'>
									<div className='w'>
										<a href='#!' className='w1'>
											<img src='' alt='' />
											<span>
												Северная <br /> Америка
											</span>
										</a>
										<a href='#!' className='w2'>
											<img src='images/south-america.svg' alt='' />
											<span>
												Южная <br /> Америка
											</span>
										</a>
										<a href='#!' className='w3'>
											<img src='images/europa.svg' alt='' />
											<span>Европа</span>
										</a>
										<a href='#!' className='w4'>
											<img src='images/africa.svg' alt='' />
											<span>Африка</span>
										</a>
										<a href='#!' className='w5'>
											<img src='images/asia.svg' alt='' />
											<span>Азия</span>
										</a>
										<a href='#!' className='w6'>
											<img src='images/australia.svg' alt='' />
											<span>Австралия</span>
										</a>
									</div>
								</div>
							</div>
						</div>

						<div className='row'>
							<div className='col-lg-12 country-form'>
								<form action='#!' method='post' id='country-form'>
									<h4>Подпишитесь, чтобы первыми узнавать обо всех новостях и акциях </h4>
									<div className='form-group'>
										<input type='email' name='email' id='email' placeholder='Email' />
										<button type='submit' id='country-btn'>
											Подписаться
										</button>
									</div>
									<p>
										Предоставляя свои данные, я соглашаюсь с <a href='#!'>политикой конфиденциальности</a>
									</p>
								</form>
							</div>
						</div>
					</div>
				</section>

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

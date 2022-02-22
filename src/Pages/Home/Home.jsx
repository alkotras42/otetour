import React from 'react'
import { Header } from '../../Layout/Header/Header'
import { HomeHeader } from './HomeHeader/HomeHeader'
import styles from './Home.module.css'
import bgImage from './bgImage.png'
import './Home.css'
import { Card } from '../../Component'
import { Recomendation } from './Recomendation/Recomendation'
import { AboutUs } from './AboutUs/AboutUs'

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

				<section className='prev-tours'>
					<div className='container'>
						<div className='row'>
							<div className='col-lg-12 title'>
								<h2>Ранее просмотренные туры</h2>
							</div>
						</div>
						<div className='row pt-rov'>
							<div className='col-lg-4 col-md-7 col-sm-8 col-10 pt-col'>
								<a href='#!' className='pt-block'>
									<div className='pt-head'>
										<div className='pt-img'>
											<img src='images/prev-tours1.png' alt='' />
										</div>
										<div className='pt-top'>
											<span className='favorite'>
												<img src='images/favorite-icon.png' alt='' className='default-img' />
												<img src='images/favorite-icon-hover.png' alt='' className='hover-img' />
											</span>
										</div>
										<div className='pt-sub'>
											<span className='rating'>
												<img src='images/star-icon.svg' alt='' /> 4.6
											</span>
											<span className='comment'>(127 отзывов)</span>
										</div>
									</div>
									<div className='pt-ftr'>
										<h4>Путешествие по винодельням и виноградникам (Армения)</h4>
										<div className='pt-date'>
											<span className='date'>5 дней</span>
											<span className='vertical-line'>|</span>
											<span className='name'>Винный тур</span>
											<span className='vertical-line'>|</span>
											<span className='month'>Июнь 2021</span>
										</div>
										<div className='pt-price'>
											<h3>
												27 000 <span className='currency-symbol'>₽</span>
											</h3>
										</div>
									</div>
								</a>
							</div>
							<div className='col-lg-4 col-md-7 col-sm-8 col-10 pt-col'>
								<a href='#!' className='pt-block'>
									<div className='pt-head'>
										<div className='pt-img'>
											<img src='images/prev-tours2.png' alt='' />
										</div>
										<div className='pt-top'>
											<span className='favorite'>
												<img src='images/favorite-icon.png' alt='' className='default-img' />
												<img src='images/favorite-icon-hover.png' alt='' className='hover-img' />
											</span>
										</div>
										<div className='pt-sub'>
											<span className='rating'>
												<img src='images/star-icon.svg' alt='' /> 4.9
											</span>
											<span className='comment'>(110 отзывов)</span>
										</div>
									</div>
									<div className='pt-ftr'>
										<h4>Путешествие по озеру Байкал (Россия)</h4>
										<div className='pt-date'>
											<span className='date'>14 дней</span>
											<span className='vertical-line'>|</span>
											<span className='name'>Водный тур</span>
											<span className='vertical-line'>|</span>
											<span className='month'>Август 2021</span>
										</div>
										<div className='pt-price'>
											<h3>
												27 000 <span className='currency-symbol'>₽</span>
											</h3>
										</div>
									</div>
								</a>
							</div>
						</div>
					</div>
				</section>

				<section className='choose-country'>
					<div className='container'>
						<div className='row'>
							<div className='col-lg-12 title'>
								<h2>Выберите страну для путешествия своей мечты</h2>
							</div>
						</div>
						<div className='row'>
							<div className='col-lg-2 col-md-3 col-sm-4 col-6 country-col'>
								<a href='#!' className='choose-country-block'>
									<img src='images/choose-country1.png' alt='' />
									<span>Италия</span>
								</a>
							</div>
							<div className='col-lg-2 col-md-3 col-sm-4 col-6 country-col'>
								<a href='#!' className='choose-country-block'>
									<img src='images/choose-country2.png' alt='' />
									<span>Россия</span>
								</a>
							</div>
							<div className='col-lg-2 col-md-3 col-sm-4 col-6 country-col'>
								<a href='#!' className='choose-country-block'>
									<img src='images/choose-country3.png' alt='' />
									<span>США</span>
								</a>
							</div>
							<div className='col-lg-2 col-md-3 col-sm-4 col-6 country-col'>
								<a href='#!' className='choose-country-block'>
									<img src='images/choose-country4.png' alt='' />
									<span>Турция</span>
								</a>
							</div>
							<div className='col-lg-2 col-md-3 col-sm-4 col-6 country-col'>
								<a href='#!' className='choose-country-block'>
									<img src='images/choose-country5.png' alt='' />
									<span>Германия</span>
								</a>
							</div>
							<div className='col-lg-2 col-md-3 col-sm-4 col-6 country-col'>
								<a href='#!' className='choose-country-block'>
									<img src='images/choose-country6.png' alt='' />
									<span>Финляндия</span>
								</a>
							</div>
							<div className='col-lg-2 col-md-3 col-sm-4 col-6 country-col'>
								<a href='#!' className='choose-country-block'>
									<img src='images/choose-country7.png' alt='' />
									<span>Канада</span>
								</a>
							</div>
							<div className='col-lg-2 col-md-3 col-sm-4 col-6 country-col'>
								<a href='#!' className='choose-country-block'>
									<img src='images/choose-country8.png' alt='' />
									<span>Австрия</span>
								</a>
							</div>
							<div className='col-lg-2 col-md-3 col-sm-4 col-6 country-col'>
								<a href='#!' className='choose-country-block'>
									<img src='images/choose-country9.png' alt='' />
									<span>Мальдивы</span>
								</a>
							</div>
							<div className='col-lg-2 col-md-3 col-sm-4 col-6 country-col'>
								<a href='#!' className='choose-country-block'>
									<img src='images/choose-country10.png' alt='' />
									<span>Испания</span>
								</a>
							</div>
							<div className='col-lg-2 col-md-3 col-sm-4 col-6 country-col'>
								<a href='#!' className='choose-country-block'>
									<img src='images/choose-country11.png' alt='' />
									<span>Чехия</span>
								</a>
							</div>
							<div className='col-lg-2 col-md-3 col-sm-4 col-6 country-col'>
								<a href='#!' className='choose-country-block'>
									<img src='images/choose-country12.png' alt='' />
									<span>Франция</span>
								</a>
							</div>
						</div>
					</div>
				</section>

				<section className='our-guides'>
					<div className='container'>
						<div className='row'>
							<div className='col-lg-12 title'>
								<h2>Наши гиды</h2>
							</div>
						</div>
						<div className='guides-slide-content'>
							<div className='guides-slide'>
								<div className='col-lg-12 guides-col'>
									<div className='guides-block'>
										<div className='guides-img'>
											<img src='images/guid1.png' alt='' />
										</div>
										<div className='guides-text'>
											<h4>Алексей</h4>
											<div className='guides-country'>
												<span className='country'>Германия</span>
												<span className='vertical-line'>|</span>
												<span className='location'>Вело-туры</span>
											</div>
										</div>
									</div>
								</div>
								<div className='col-lg-12 guides-col'>
									<div className='guides-block'>
										<div className='guides-img'>
											<img src='images/guid2.png' alt='' />
										</div>
										<div className='guides-text'>
											<h4>Ольга</h4>
											<div className='guides-country'>
												<span className='country'>Карелия, Россия</span>
											</div>
										</div>
									</div>
								</div>
								<div className='col-lg-12 guides-col'>
									<div className='guides-block'>
										<div className='guides-img'>
											<img src='images/guid3.png' alt='' />
										</div>
										<div className='guides-text'>
											<h4>Сергей</h4>
											<div className='guides-country'>
												<span className='country'>Флорида, США</span>
												<span className='vertical-line'>|</span>
												<span className='location'>Фитнес туры</span>
											</div>
										</div>
									</div>
								</div>
								<div className='col-lg-12 guides-col'>
									<div className='guides-block'>
										<div className='guides-img'>
											<img src='images/guid4.png' alt='' />
										</div>
										<div className='guides-text'>
											<h4>Алексей</h4>
											<div className='guides-country'>
												<span className='country'>Финляндия</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className='how-it-works'>
					<div className='container'>
						<div className='row'>
							<div className='col-lg-12 title'>
								<h2>Как это работает?</h2>
							</div>
						</div>
						<div className='row hiw-rov	'>
							<div className='col-lg-3 col-md-6'>
								<div className='hiw-block'>
									<span className='num'>1</span>
									<h4>Выберите тур</h4>
									<p>
										Здесь собрано множество предложений от проверенных экспертов, которые берут всю организацию на себя, чтобы
										сделать Ваш отдых лучшим.
									</p>
								</div>
							</div>
							<div className='col-lg-1 d-xl-block d-lg-block d-md-none d-sm-none d-xs-none arrow-col'>
								<img src='images/big-arrow.svg' alt='' />
							</div>
							<div className='col-lg-3 col-md-6'>
								<div className='hiw-block'>
									<span className='num'>2</span>
									<h4>Пообщайтесь с организатором</h4>
									<p>
										Все поездки у экспертов по путешествиям тщательно спланированы. Вы можете уточнить всю интересующую информацию
										напрямую у организатора.
									</p>
								</div>
							</div>
							<div className='col-lg-1 d-xl-block d-lg-block d-md-none d-sm-none d-xs-none arrow-col'>
								<img src='images/big-arrow.svg' alt='' />
							</div>
							<div className='col-lg-3 col-md-6'>
								<div className='hiw-block'>
									<span className='num'>3</span>
									<h4>Забронируйте тур</h4>
									<p>С помощью безопасной системы приёма платежей забронируйте понравившийся Вам тур.</p>
								</div>
							</div>
							<div className='col-lg-3 col-md-6 d-xl-none d-lg-none d-md-block'>
								<div className='hiw-block'>
									<span className='num'>4</span>
									<h4>Оставьте свой отзыв</h4>
									<p>Делитесь своими впечатлениями от поездки, ведь это поможет будущему путешественнику сделать свой выбор.</p>
								</div>
							</div>
						</div>

						<div className='row right-rov d-xl-block d-lg-block d-md-none d-sm-none d-xs-none'>
							<div className='col-lg-12 right'>
								<img src='images/big-arrow.svg' alt='' />
							</div>
						</div>

						<div className='row justify-content-center'>
							<div className='col-lg-3 col-md-6'>
								<div className='hiw-block mb-0'>
									<span className='num'>5</span>
									<h4>Возвращайтесь к нам</h4>
									<p>Возвращайтесь к нам за новыми приключениями и незабываемыми впечатлениями!</p>
								</div>
							</div>
							<div className='col-lg-3 d-xl-block d-lg-block d-md-none d-sm-none d-xs-none arrow-col center'>
								<img src='images/big-arrow.svg' alt='' />
							</div>
							<div className='col-lg-3 col-md-6 d-xl-block d-lg-block d-md-none d-sm-none d-xs-none'>
								<div className='hiw-block mb-0'>
									<span className='num'>4</span>
									<h4>Оставьте свой отзыв</h4>
									<p>Делитесь своими впечатлениями от поездки, ведь это поможет будущему путешественнику сделать свой выбор.</p>
								</div>
							</div>
						</div>
					</div>
				</section>

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

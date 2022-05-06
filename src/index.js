import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpApi from 'i18next-http-backend'
import { i18nInit } from './Controller/LanguageController'
import { Loading } from './Component'


i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.use(LanguageDetector)
	.use(HttpApi)
	.init(i18nInit)

ReactDOM.render(
	<Suspense fallback={<Loading/>}>
		<App />
	</Suspense>,
	document.getElementById('root')
)

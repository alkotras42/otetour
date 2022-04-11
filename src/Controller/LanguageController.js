export const i18nInit = {
	// the translations
	// (tip move them in a JSON file and import them,
	// or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
	supportedLngs: ['ru', 'en', 'es', 'fr', 'it', 'de'],
	fallbackLng: 'ru',
	detection: {
		order: ['subdomain', 'cookie', 'localStorage', 'sessionStorage', 'htmlTag', 'path'],
		caches: ['cookie'],
	},

	interpolation: {
		escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
	},
	backend: {
		loadPath: 'https://api.otetour.com/translation/?language={{lng}}',
		allowMultiLoading: false,
	},
}

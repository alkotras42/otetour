export const i18nInit = {
	// the translations
	// (tip move them in a JSON file and import them,
	// or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
	supportedLngs: ['ru', 'en'],
	fallbackLng: 'ru',
	detection: {
		order: ['cookie', 'localStorage', 'sessionStorage', 'htmlTag', 'path', 'subdomain'],
		caches: ['cookie'],
	},

	interpolation: {
		escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
	},
	backend: {
		loadPath: '/assets/locals/{{lng}}/translate.json',
	},
}

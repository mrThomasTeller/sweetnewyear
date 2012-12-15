require.config({
	paths: {
		"jquery.validate.full": "js/packages/jquery.validate.full",
		"base-polyfills": "js/packages/base-polyfills",
		"base": "js/packages/base",
		"knockout": "js/packages/knockout",

		"jquery.validate": "js/vendor/jquery.validate/jquery.validate",
		"jquery": "js/vendor/jquery-1.8.3",
		"knockout-raw": "js/vendor/knockout-2.2.0",
		"knockout.vhtml": "js/libs/knockout.vhtml",
		"config": "js/config",
		"jquery.validate.messages_ru": "js/vendor/jquery.validate/messages_ru",
		"jquery.fancybox": "js/vendor/fancybox/jquery.fancybox"
	},
	shim: {
		//jquery
		"jquery": ["base-polyfills"],
		"jquery.fancybox": ["jquery"],
		"jquery.validate": ["jquery"],
		"jquery.validate.messages_ru": ["jquery.validate"],

		//knockout
		"knockout-raw": ["base-polyfills"],
		"knockout.vhtml": ["knockout"]
	}
});
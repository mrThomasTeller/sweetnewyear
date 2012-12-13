function main(slider)
{
	$.ajax({url: "resources/data.json", cache: false, success: function (result)
	{
		result = typeof result === "string" ? JSON.parse(result) : result;

		result.products.forEach(function (product)
		{
			if (Array.isArray(product.description))
			{
				product.description = product.description.join("");
			}
		});
		for (var pageName in result.pages)
		{
			if (result.pages.hasOwnProperty(pageName))
			{
				var page = result.pages[pageName];
				if (Array.isArray(page.content))
				{
					page.content = page.content.join("");
				}
			}
		}

		function ViewModel()
		{
			var self = this;

			this.products = result.products;
			this.pages = result.pages;
			this.selectedProductIndex = ko.observable(0);
			this.page = ko.observable("main"); //offer, principe, order, callback
			this.mailSent = ko.observable(false);
			this.mailWait = ko.observable(false);

			this.getProductImage = function (relativeSrc)
			{
				return "resources/products/" + relativeSrc;
			};

			this.goToMainPage = function ()
			{
				self.page("main");
			};

			//productIndex binding
			var enableProductIndexListening = true;
			this.selectedProductIndex.subscribe(function (value)
			{
				if (enableProductIndexListening)
				{
					slider.goTo(value);
				}
			});
			slider.onChangePosition.subscribe(function (position)
			{
				enableProductIndexListening = false;
				this.selectedProductIndex(position);
				enableProductIndexListening = true;
			}, this);

			//page binding
			this.page.subscribe(function (page)
			{
				if (page !== "main")
				{
					slider.stop();
				}

				if (page === "callback")
				{
					self.mailSent(false);
				}
			});
		}

		window.koViewModel = new ViewModel();
		ko.applyBindings(window.koViewModel);
		setTimeout(function ()
		{
			slider.init(slider);
			$(".l-loader").fadeOut("fast");
		}, 0);
	}});
}

require.config({
	paths: {
		"jquery.validate.full": "js/libs/empty"
	},
	shim: {
		"js/vendor/jquery.validate/messages_ru": {
			deps: ["js/vendor/jquery.validate/jquery.validate"]
		},
		"jquery.validate.full": {
			deps: ["js/vendor/jquery.validate/messages_ru"]
		}
	}
});

require(["js/vendor/json2.js", "js/vendor/es5-shim.js"], function ()
{
	require(["js/vendor/jquery-1.8.3.js", "js/vendor/knockout-2.2.0.js"], function (js, ko)
	{
		window.ko = ko;
		require(["js/slider.js", "js/callbackForm.js", "js/vendor/fancybox/jquery.fancybox.js",
			"js/libs/knockout.vhtml.js", "js/koextends.js"],
			function (slider)
			{
				main(slider);
			});
	});
});

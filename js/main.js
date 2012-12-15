define(["./slider.js", "config", "./callbackForm.js", "base", "jquery.fancybox"], function (slider, config)
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
					$("html, body").animate({scrollTop: config.page.pageTop});
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
});

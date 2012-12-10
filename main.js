function main(slider)
{
	(function ()
	{
		var fancyboxGroupNum = 0;

		function fancyboxGroup(element)
		{
			var el = $(element);
			var rel = el.data("rel");
			if (!rel)
			{
				rel = "fancyboxgroup-" + (++fancyboxGroupNum);
				el.data("rel", rel);
			}
			el.find("a").each(function ()
			{
				$(this).attr("rel", rel);
			}).fancybox();
		}

		ko.bindingHandlers.fancyboxGroup = {
			init: fancyboxGroup,
			update: fancyboxGroup
		};
	})();

	ko.bindingHandlers.firstNavigation = {
		init: function (element, valueAccessor, allBindingsAccessor, viewModel)
		{
			$(element).click(function (){ viewModel.page(valueAccessor()) });
		},
		update: function (element, valueAccessor, allBindingsAccessor, viewModel)
		{
			$(element).toggleClass("state_selected", valueAccessor() === viewModel.page());
		}
	};

	$.get("resources/data.json", function (result)
	{
		result = typeof result === "string" ? JSON.parse(result) : result;

		function ViewModel()
		{
			this.products = result.products;
			this.selectedProductIndex = ko.observable(0);
			this.page = ko.observable("main"); //offer, principe, order

			this.getProductImage = function (relativeSrc)
			{
				return "resources/products/" + relativeSrc;
			};
			
			this.goToMainPage = function()
			{
				this.page("main");
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
				if (page === "main")
				{
					slider.start();
				}
				else
				{
					slider.stop();
				}
			});
		}

		ko.applyBindings(new ViewModel());
		setTimeout(function ()
		{
			slider.init(slider);
			$(".l-loader").fadeOut("fast");
		}, 0);
	});
}

require(["js/vendor/json2.js", "js/vendor/es5-shim.js", "js/vendor/html5shiv.js"], function ()
{
	require(["js/vendor/jquery-1.8.3.js", "js/vendor/knockout-2.2.0.js"], function (js, ko)
	{
		window.ko = ko;
		require(["js/vendor/fancybox/jquery.fancybox.js", "js/slider.js"], function (fb, slider)
		{
			main(slider);
		});
	});
});

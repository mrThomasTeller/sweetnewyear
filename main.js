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

	$.get("resources/data.json", function (result)
	{
		result = typeof result === "string" ? JSON.parse(result) : result;

		function ViewModel()
		{
			this.products = result.products;

			this.getProductImage = function (relativeSrc)
			{
				return "resources/products/" + relativeSrc;
			}
		}

		ko.applyBindings(new ViewModel());
		setTimeout(slider.init.bind(slider), 0);
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

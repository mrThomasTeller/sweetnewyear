define(["knockout"], function ()
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

	ko.bindingHandlers.stopBindings = {
		init: function ()
		{
			return {controlsDescendantBindings: true};
		}
	};
	ko.virtualElements.allowedBindings.stopBindings = true;

	ko.iterateObject = function (obj)
	{
		var arr = [];
		for (var key in obj)
		{
			if (obj.hasOwnProperty(key))
			{
				arr.push({key: key, value: obj[key]});
			}
		}

		return arr;
	};
});

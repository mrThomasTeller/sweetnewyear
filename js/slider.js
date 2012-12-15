define(["config", "base"], function (config)
{
	var Slider = function (element)
	{
		this.onChangePosition = new Observer();
		
		this.__element = $(element);
	};

	$.extend(Slider.prototype, {
		init: function ()
		{
			this.__buttonPrev = this.__element.find(".b-products-slider-button-prev");
			this.__buttonNext = this.__element.find(".b-products-slider-button-next");
			this.__items = this.__element.find(".b-products-slider-item");
			this.__container = this.__element.find(".b-products-slider-items");
			this.__position = 0;
			this.__count = this.__items.length;

			this.__setUpBehavior();
			this.start();
		},
		/**
		 * @param position
		 * @param [dontStop=false] {Boolean}
		 */
		goTo: function (position, dontStop)
		{
			if (!dontStop)
			{
				this.stop();
			}
			
			if (this.__position === position)
			{
				return;
			}
			
			this.__position = position;
			this.__container.stop().animate({left: -this.__items.eq(this.__position).position().left});

			this.onChangePosition.fire(this.__position);
		},
		/**
		 * @param [dontStop=false] {Boolean}
		 */
		next: function (dontStop)
		{
			this.goTo(this.__position === this.__count - 1 ? 0 : this.__position + 1, dontStop);
		},
		/**
		 * @param [dontStop=false] {Boolean}
		 */
		prev: function (dontStop)
		{
			this.goTo(this.__position === 0 ? this.__count - 1 : this.__position - 1, dontStop);
		},
		start: function()
		{
			this.stop();
			this.__interval = setInterval(this.next.bind(this, true), config.slider.slideShowInterval);
		},
		stop: function ()
		{
			if (this.__interval) {
				clearInterval(this.__interval);
				this.__interval = null;
			}
		},
		__setUpBehavior: function()
		{
			this.__buttonPrev.click(this.prev.bind(this));
			this.__buttonNext.click(this.next.bind(this));
			this.__element.click(this.stop.bind(this));
		}
	});

	return new Slider($(".b-products-slider"));
});

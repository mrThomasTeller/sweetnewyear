/**
 * Реализация паттерна Observer
 */
Observer = function () {
	this._fns = [];
	this._lastListenerId = 0;
};

Observer.prototype = {
	/**
	 * Подписаться на данное событие
	 * @param {Function} fn
	 */
	subscribe:function (fn, context)
	{
		var listener = function(){ fn.apply(context || this, arguments) };
		listener.fn = fn;
		listener.id = ++this._lastListenerId;
		this._fns.push(listener);

		return listener.id;
	},

	/**
	 * Отписаться от данного события
	 * @param {Function} fn
	 */
	unsubscribe: function (fn) {
		this._fns = this._fns.filter(typeof fn == "function"
			? function (el) { return el.fn !== fn }
			: function (el) { return el.id !== fn });
	},

	/**
	 * Возбуждение события
	 */
	fire:function (/*...*/) {
		var params = arguments;
		this._fns.forEach(function (el) {
			el.apply(window, params);
		});
	}

};

define(["base", "jquery.validate.full"], function ()
{
	function CallbackForm(rootViewModel)
	{
		this.__rootViewModel = rootViewModel;
		this.__formElement = $(".b-cbform");
		this.__formHeight = this.__formElement.outerHeight();
		this.__successTextElement = $(".b-cbform-success").css("top", -this.__formHeight);

		this.sendState = ko.observable("ready"); //sending, sent

		this.setUpValidation();
		this.sendState.subscribe(this.onStateChange.bind(this));
	}

	CallbackForm.prototype = {
		constructor: CallbackForm,

		goToMainPage: function ()
		{
			return this.__rootViewModel.goToMainPage();
		},

		onStateChange: function (state)
		{
			if (state === "sending")
			{
				this.__formElement.animate({top: 65});
				this.__sendingStateTimeout = setTimeout(function ()
				{
					this.__sendingStateTimeout = null;
					if (this.sendState() === "sent")
					{
						this.onStateChange("sent");
					}
				}.bind(this), 1000);
			}
			else if (state === "sent")
			{
				if (!this.__sendingStateTimeout)
				{
					this.__formElement.animate({top: this.__formHeight + 65});
					this.__successTextElement.animate({top: 0});
				}
			}
			else if (state === "ready")
			{
				this.__formElement[0].reset();
				this.__formElement.css("top", 0);
				this.__successTextElement.css("top", -this.__formHeight);
			}
		},

		onSubmit: function (form)
		{
			form = $(form);
			var data = {
				name: form.find("[name=name]").val(),
				phone: form.find("[name=phone]").val(),
				additional: form.find("[name=additional]").val()
			};

			this.sendState("sending");
			$.post("script/callback.php", data, function (response)
			{
				this.sendState("sent");
			}.bind(this));
		},

		setUpValidation: function ()
		{
			this.__formElement.validate({
				submitHandler: this.onSubmit.bind(this)
			});
		}
	};

	return CallbackForm;
});

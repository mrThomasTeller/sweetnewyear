define(["base", "jquery.validate.full"], function ()
{
	function CallbackForm(rootViewModel)
	{
		this.__rootViewModel = rootViewModel;

		this.formElement = $(".b-cbform");
		this.formHeight = this.formElement.outerHeight();
		this.successTextElement = $(".b-cbform-success").css("top", -this.formHeight);
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
				this.formElement.animate({top: 65});
			}
			else if (state === "sent")
			{
				this.formElement.animate({top: this.formHeight + 65});
				this.successTextElement.animate({top: 0});
			}
			else if (state === "ready")
			{
				this.formElement.css("top", 0);
				this.successTextElement.css("top", -this.formHeight);
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
				form.get(0).reset();
			}.bind(this));
		},

		setUpValidation: function ()
		{
			this.formElement.validate({
				submitHandler: this.onSubmit.bind(this)
			});
		}
	};

	return CallbackForm;
});

define(["jquery.validate.full"], function ()
{
	$.validator.addMethod("phone", function(value, element){
		return this.optional(element) || /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{6,10}$/.test(value);
	}, "Неправильно введён телефон!");
	
	$(".b-cbform").validate({
		submitHandler: function (form)
		{
			form = $(form);
			var data = {
				name: form.find("[name=name]").val(),
				phone: form.find("[name=phone]").val(),
				additional: form.find("[name=additional]").val()
			};

			koViewModel.mailWait(true);
			$.post("script/callback.php", data, function(response){
				koViewModel.mailWait(false);
				koViewModel.mailSent(true);
				form.get(0).reset();
			});
		}
	});
});

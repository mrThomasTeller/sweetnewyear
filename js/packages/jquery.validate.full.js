define(["jquery.validate", "jquery.validate.messages_ru"], function ()
{
	$.validator.addMethod("phone", function (value, element)
	{
		return this.optional(element) || /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{6,10}$/.test(value);
	}, "Неправильно введён телефон!");
});

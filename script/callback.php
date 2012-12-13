<?php
mail("rytrycon@gmail.com", "Заказ", "Имя: {$_POST['name']}\nТелефон: {$_POST['phone']}\nДополнительно: {$_POST['additional']}\n");
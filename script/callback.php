<?php
mail("artyom.bakharev@gmail.com", "Заказ", "Имя: {$_POST['name']}\nТелефон: {$_POST['phone']}\nДополнительно: {$_POST['additional']}\n");
<?php
mail("artyom.bakharev@gmail.com", "�����", "���: {$_POST['name']}\n�������: {$_POST['phone']}\n�������������: {$_POST['additional']}\n");
echo "���: {$_POST['name']}\n�������: {$_POST['phone']}\n�������������: {$_POST['additional']}\n";
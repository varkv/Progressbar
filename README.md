# Progressbar
[![License](http://img.shields.io/badge/License-MIT-blue.svg)](http://opensource.org/licenses/MIT)
7Kb gziped!
Progressbar барабанного типа

Возможно вам уже надоели простые и невзрачные прогресс-бары, от которых веет скукой. Я хочу показать вам необычный прогресс.
Прогресс состоит из нескольких прогресс баров, которые сменяют друг друга как в барабане револьвера. 

## Использование

Вы можете посмотреть в примерах, какие файлы вам нужны:
 - [jQuery library](http://jquery.com/). (1.7.0 minimum)
 - [jQuery UI library](http://jqueryui.com/). (1.8.0 minimum), используются модули progress и animate
 - Css файл [jQuery UI library](http://jqueryui.com/).
 - JavaScript файл `kkProgressbar.js` (или минифицированная версия `kkProgressbar.min.js`)
 - Css файл `kkProgressbar.style.css` (или минифицированная версия `kkProgressbar.style.min.css`)
 
### Подключение файлов

```html
<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">
<link rel="stylesheet" type="text/css" href="kkProgressbar.style.css" />

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js"></script>
<script src="kkProgressbar.js"></script>
```
### Требуемая HTML структура

Для работы плагина нет необходимости создавать определенную структуру. Все что вам нужно - определить элемент в котором будет размещен `kkProgressbar` и указать его стили при необходимости.

### Инициализация

Все что нужно это создать новый экземпляр модуля `kkProgressbar` внутри функции `$(document).ready`  и затем становится возможным управлять модулем:
```javascript
$(document).ready(function() {
	var progressBar = $("#progressbar_container").kkProgressbar(); // создание нового экземпляра	
	progressBar.enable(); // показать 	
	progressBar.disable(); // скрыть 
});
```
Более подробная инициализация выглядит так:
```javascript
$(document).ready(function() {
	var progressBar = $("#progressbar_container").kkProgressbar({
        "textList": [
            "Обрабатываем запрос",
            "Размечаем границы",
            "Ставим маркеры"
        ],
        "speed": 15,
        "closeDelay": 1000,
    });
});
```

### Настройки

- `textList`: список строк, который будут отображаться поочередно в прогресбарах  

- `speed`: (default `15`) скорость заполнения прогресс-бара

- `closeDelay`: (default `1000`) задержка в милисекундах при закрытии прогресс-бара. Если в этот промежуток будет вызвана функция `enable()` то `kkProgressbar` продолжит работу.

## License

(The MIT License)

Copyright (c) 2015 Korol Kirill 

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
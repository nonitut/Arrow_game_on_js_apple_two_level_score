# Arrow_game_on_js_apple_two_level_score

## Таблица методов работы со стилями в JavaScript

| Категория | Метод/Свойство | Описание | Пример |
|-----------|---------------|----------|--------|
| **Изменение стиля через `style`** | `element.style.color = "red"` | Изменяет цвет текста | `document.getElementById("box").style.color = "blue";` |
|  | `element.style.backgroundColor = "yellow"` | Изменяет фоновый цвет | `element.style.backgroundColor = "pink";` |
|  | `element.style.fontSize = "20px"` | Изменяет размер шрифта | `element.style.fontSize = "24px";` |
|  | `element.style.display = "none"` | Скрывает элемент | `element.style.display = "none";` |
| **Изменение стиля через `classList`** | `element.classList.add("new-class")` | Добавляет класс | `element.classList.add("active");` |
|  | `element.classList.remove("old-class")` | Удаляет класс | `element.classList.remove("hidden");` |
|  | `element.classList.toggle("highlight")` | Переключает класс | `element.classList.toggle("dark-mode");` |
|  | `element.classList.contains("my-class")` | Проверяет наличие класса | `element.classList.contains("hidden");` |
| **Работа с `getComputedStyle`** | `window.getComputedStyle(element).color` | Получает текущий цвет текста элемента | `console.log(getComputedStyle(element).color);` |
| **События и действия** | `onclick` | Запускает код при клике | `button.onclick = function() { alert("Clicked!"); };` |
|  | `onmouseover` | При наведении изменяет стиль | `element.onmouseover = function() { this.style.color = "green"; };` |
|  | `onmouseout` | При уходе курсора возвращает стиль | `element.onmouseout = function() { this.style.color = "black"; };` |
|  | `onkeydown` | Изменяет стиль при нажатии клавиши | `document.onkeydown = function() { document.body.style.backgroundColor = "lightgray"; };` |
|  | `onload` | Применяет стили после загрузки страницы | `window.onload = function() { document.body.style.fontSize = "18px"; };` |

Конвертер валют

`Описание`

`Header с курсом валют`

1. В header-е необходимо отображать актуальный курс
   валют (USD, EUR) по отношению к гривне (UAH)

2. Актуальный курс валют должен приходить с любого публичного API #`Компонент с конвертацией`

3. Для одной валюты должен быть свой input и select.
4. Oтдельный input + select для первой валюты, и отдельный input + select для второй валюты
5. В input задается число, чтобы указать кол-во единиц для конвертирования
6. В select должно быть не менее трех валют - UAH, USD, EUR.
7. Конвертация должна происходить в обоих направлениях:

- при изменении значения в первой валюте, должно пересчитываться значение во второй, и наоборот
- при изменении валюты в каждом select-е, конвертация обеих валют должна пересчитываться корректно

`Плюсом будет:`

- Хорошо продуманный интерфейс и внешний вид
- Чистый код
- Для реализации используйте React JS

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
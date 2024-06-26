#  User-scores
## Приложение для пользовательского рейтинга

Интерфейс системы оценки / бана / поощрений пользователей

Интерфейс визуально он состоит из двух частей:

список пользователей (запрашивается с https://random-data-api.com/api/users);
список пользователей с оценками: положительными и отрицательными.
Пользователь интерфейса может взаимодействовать с этими списками, изменяя оценки.

В левой колонке список пользователей, для управления списком есть две кнопки:
1) обновить список (старые пользователи исчезнут, новые появятся);
2) следующая страница (старые пользователи остаются в списке, новые добавляются ниже).

Рядом с каждой записью (пользователем) есть кнопки изменения рейтинга: + и -. При нажатии на одну из кнопок, выбранная запись попадает в соответствующую вкладку правой колонки (из левого списка удаляется). Вкладка становится активной.

Правая колонка содержит две вкладки с похожими списками. Записи в этих списках отличаются от записей в левой колонке тем, что у них есть значение (целое число), отображающее текущий рейтинг пользователя. В этом списке так же кнопками + и - можно менять рейтинг пользователя. При установлении рейтинга в значение 0, в строку добавляется кнопка удаления пользователя из текущего списка и возвращения его в левый список.

Границы рейтинга: (-5;5]. При достижении граничного значения должно появляться модальное окно с подтверждением:

Нижняя граница: "Пора забанить {username}. Сделать это?"
Верхняя граница: "Нужно вознаградить {username}. Сделать это?"
По нажатию кнопки "Да" пользователь удаляется из правой колонки и возвращается в левую, можно начать с ним работать заново.

Каждое действие пользователя логируется в консоль.

Проект разработан при помощи Typescript, React и библиотеки готовых компонентов Chakra.js.

Тестирование проведено с помощью Cypress.

Приложение адаптировано под мобильные устройства.

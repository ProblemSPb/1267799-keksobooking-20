'use strict';

(function () {
  // Валидация полей "Количество комнат" и "Количество мест"
  // дифолтовые значения
  var selectedNumberRooms = 1;
  var selectedNumberGuests = 3;

  // Назначение кастомного значения поп-апу с ошибкой валидации полей формы
  // Поля: "Количество комнат" и "Количество мест"
  var validateRoomsGuests = function (field) {
    capacity.classList.remove('map__filter__invalid');

    if (selectedNumberRooms === 1 && selectedNumberGuests !== 1) {
      field.setCustomValidity('1 комната должна быть для 1 гостя');
      capacity.classList.add('map__filter__invalid');
    } else if (selectedNumberRooms === 2 && !(selectedNumberGuests > 0 && selectedNumberGuests < 3)) {
      field.setCustomValidity('2 комнаты должны быть для 1 или 2 гостей');
      capacity.classList.add('map__filter__invalid');
    } else if (selectedNumberRooms === 3 && !(selectedNumberGuests > 0 && selectedNumberGuests < 4)) {
      field.setCustomValidity('3 комнаты должны быть для 1, 2 или 3 гостей');
      capacity.classList.add('map__filter__invalid');
    } else if (selectedNumberRooms === 100 && (selectedNumberGuests !== 0)) {
      field.setCustomValidity('100 комнат должны быть не для гостей');
      capacity.classList.add('map__filter__invalid');
    }
  };
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  roomNumber.addEventListener('change', function () {
    selectedNumberRooms = parseInt(roomNumber.value, 10);

    validateRoomsGuests(roomNumber);
  });

  capacity.addEventListener('change', function () {
    selectedNumberGuests = parseInt(capacity.value, 10);

    validateRoomsGuests(capacity);
  });

  var formSubmit = document.querySelector('.ad-form__submit');
  formSubmit.addEventListener('submit', function () {
    // если не изменили дифолтовые значения полей "Количество комнат" и "Количество мест"
    validateRoomsGuests(capacity);
  });

})();


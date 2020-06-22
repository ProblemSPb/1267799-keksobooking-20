'use strict';

(function () {


  // Адрес по дифолту
  var addressField = document.querySelector('#address');
  addressField.value = window.pin.getPosition(window.pin.defaultSerachPin);

  // форма добавления нового объявления
  var fieldset = document.querySelector('fieldset');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelector('fieldset');
  var mainFormFilters = document.querySelectorAll('.map__filter');

  // Валидация полей "Количество комнат" и "Количество мест"
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  // дифолтовые значения
  var selectedNumberRooms = 1;
  var selectedNumberGuests = 3;

  function getFieldValidationMessage() {
    var message = '';
    if (selectedNumberRooms === 1 && selectedNumberGuests !== 1) {
      message = '1 комната должна быть для 1 гостя';
    } else if (selectedNumberRooms === 2 && !(selectedNumberGuests > 0 && selectedNumberGuests < 3)) {
      message = '2 комнаты должны быть для 1 или 2 гостей';
    } else if (selectedNumberRooms === 3 && !(selectedNumberGuests > 0 && selectedNumberGuests < 4)) {
      message = '3 комнаты должны быть для 1, 2 или 3 гостей';
    } else if (selectedNumberRooms === 100 && (selectedNumberGuests !== 0)) {
      message = '100 комнат должны быть не для гостей';
    }
    return message;
  }

  function validateRoomsGuests() {
    var validationMessage = getFieldValidationMessage();

    capacity.classList.remove('map__filter__invalid');

    if (validationMessage) {
      capacity.setCustomValidity(validationMessage);
      capacity.classList.add('map__filter__invalid');
    }
  }

  roomNumber.addEventListener('change', function () {
    selectedNumberRooms = parseInt(roomNumber.value, 10);

    validateRoomsGuests();
  });

  capacity.addEventListener('change', function () {
    selectedNumberGuests = parseInt(capacity.value, 10);

    validateRoomsGuests();
  });

  var formSubmit = document.querySelector('.ad-form__submit');
  formSubmit.addEventListener('submit', function () {
    // если не изменили дифолтовые значения полей "Количество комнат" и "Количество мест"
    validateRoomsGuests();
  });

  window.form = {
    deactivateForm: function deactivateForm() {
      fieldset.disabled = true;
      adFormFieldset.disabled = true;

      mainFormFilters.forEach(function (mainFormfilter) {
        mainFormfilter.disabled = true;
      });
    },
    activateForm: function activateForm() {
      fieldset.disabled = false;
      adFormFieldset.disabled = false;
      adForm.classList.remove('ad-form--disabled');

      mainFormFilters.forEach(function (mainFormfilter) {
        mainFormfilter.disabled = false;
      });

      // асайниит новый адрес пину после активации
      addressField.value = window.pin.getPosition(window.pin.defaultSerachPin);
    }
  };
})();


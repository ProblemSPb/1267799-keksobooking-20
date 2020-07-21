'use strict';

(function () {

  // форма добавления нового объявления
  // var fieldset = document.querySelector('fieldset');
  var adForm = document.querySelector('.ad-form');
  // var adFormFieldset = adForm.querySelector('fieldset');
  // var mainFormFilters = document.querySelectorAll('.map__filter');

  // поле "Адрес"
  // Адрес по дифолту
  var addressField = document.querySelector('#address');
  addressField.value = 601 + ', ' + 459;

  // поле "Тип Жилья"
  var housingType = document.querySelector('#type');
  var housingTypeMap = {
    bungalo: 'Бунгало',
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом'
  };

  // поле "Цена за ночь, руб"
  var price = document.querySelector('#price');

  // при изменении поля Тип жилья, значение в поле Цена за ночь тоже изменится
  function onChangeHousingType(evt) {
    switch (housingTypeMap[evt.target.value]) {
      case housingTypeMap.bungalo:
        price.min = 0;
        price.placeholder = '0';
        break;
      case housingTypeMap.flat:
        price.min = 1000;
        price.placeholder = '1000';
        break;
      case housingTypeMap.house:
        price.min = 5000;
        price.placeholder = '5000';
        break;
      case housingTypeMap.palace:
        price.min = 10000;
        price.placeholder = '10000';
        break;
    }
  }

  housingType.addEventListener('change', onChangeHousingType);

  // поле "Время заезда"
  var timein = document.querySelector('#timein');
  // поле "Время выезда"
  var timeout = document.querySelector('#timeout');

  // при изменении полей "Время заезда", "Время выезда" их значения изменияются
  var onChangeTime = function (evt) {
    var timeValue = evt.target.value;

    timein.value = timeValue;
    timeout.value = timeValue;
  };

  timein.addEventListener('change', onChangeTime);
  timeout.addEventListener('change', onChangeTime);

  // Поля "Количество комнат" и "Количество мест"
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  // Валидация полей "Количество комнат" и "Количество мест"
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

  // кнопка очистки формы
  var resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('keyup', function (evt) {
    if (evt.keyCode === 27) {
      window.form.clearForm();
    }
  });

  window.form = {
    adForm: adForm,
    clearForm: function clearForm() {
      document.querySelector('#title').value = 'Милая, уютная квартирка в центре Токио';
      document.querySelector('#address').value = '601, 459';
      document.querySelector('#type').value = 'flat';
      document.querySelector('#price').value = '1000';
      document.querySelector('#timein').value = '12:00';
      document.querySelector('#timeout').value = '12:00';
      document.querySelector('#room_number').value = '1';
      document.querySelector('#capacity').value = '1';
      document.querySelector('#description').value = 'Здесь расскажите о том, какое ваше жилье замечательное и вообще';

      // возвращает все чекбоксы в положение unchecked
      var featureCheckbox = document.querySelectorAll('.feature__checkbox');
      for (var j = 0; j < featureCheckbox.length; j++) {
        // eslint-disable-next-line no-unused-expressions
        featureCheckbox[j].checked = false;
      }
    },
    deactivateForm: function deactivateForm() {
      // fieldset.disabled = true;
      // adFormFieldset.disabled = true;

      // mainFormFilters.forEach(function (mainFormfilter) {
      //   mainFormfilter.disabled = true;
      // });
      var formTag = document.querySelector('.ad-form');
      formTag.classList.add('ad-form--disabled');
    },
    activateForm: function activateForm() {
      // fieldset.disabled = false;
      // adFormFieldset.disabled = false;
      adForm.classList.remove('ad-form--disabled');

      // mainFormFilters.forEach(function (mainFormfilter) {
      //   mainFormfilter.disabled = false;
      // });
    }
  };
})();


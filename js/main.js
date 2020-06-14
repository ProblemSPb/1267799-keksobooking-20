/* eslint-disable no-unused-vars */
'use strict';

var NUMBER_OF_ADS = 8;

var TITLE = [
  'Просторная квартира',
  'Модный лофт',
  'В 5 минутах от метро',
  'Свежий ремонт',
  'Уютная студия',
  'Роскошный вариант с огромным метражом',
  'Отличный вариант в тихом районе',
  'Сдается срочно! Выгодное предложение!',
  'Хороший дом, тихие соседи'
];

var PRICE_MIN = 500;
var PRICE_MAX = 25000;
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS_MIN = 1;
var ROOMS_MAX = 5;
var GUESTS_MIN = 0;
var GUESTS_MAX = 10;
var CHECKIN_OUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var DESCRIPTION = [
  'Просторная квартира',
  'Модный лофт',
  'В 5 минутах от метро',
  'Свежий ремонт',
  'Уютная студия',
  'Роскошный вариант с огромным метражом',
  'Отличный вариант в тихом районе',
  'Сдается срочно! Выгодное предложение!',
  'Хороший дом, тихие соседи'
];

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var COORDINATE_X_MIN = 0;
var COORDINATE_X_MAX = 1140;
var COORDINATE_Y_MIN = 130;
var COORDINATE_Y_MAX = 630;
var PIN_SIZE = [50, 70];
// пин-маффин
var SEARCH_PIN_SIZE = [65, 65];

// Получение рандомного числа в заданном интервале. Максимум и минимум включаются
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// получение рандомного элемента из массива
function getRandomElement(ads) {
  var element = Math.floor(Math.random() * ads.length);
  return ads[element];
}

// создание массива из имеющихся данных
function generateAds(maxAdsNumber) {

  var ads = [];
  for (var i = 0; i < maxAdsNumber; i++) {
    var x = getRandomIntInclusive(COORDINATE_X_MIN, COORDINATE_X_MAX);
    var y = getRandomIntInclusive(COORDINATE_Y_MIN, COORDINATE_Y_MAX);

    ads.push({
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': getRandomElement(TITLE),
        'address': x + ', ' + y,
        'price': getRandomIntInclusive(PRICE_MIN, PRICE_MAX),
        'type': getRandomElement(TYPE),
        'rooms': getRandomIntInclusive(ROOMS_MIN, ROOMS_MAX),
        'guests': getRandomIntInclusive(GUESTS_MIN, GUESTS_MAX),
        'checkin': getRandomElement(CHECKIN_OUT_TIME),
        'checkout': getRandomElement(CHECKIN_OUT_TIME),
        'features': getRandomElement(FEATURES),
        'description': getRandomElement(DESCRIPTION),
        'photos': getRandomElement(PHOTOS)
      },
      'location': {
        'x': x,
        'y': y
      }
    });
  }
  return ads;
}

var ads = generateAds(NUMBER_OF_ADS);

var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var listElement = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

// функция создания метки с аватаром
// eslint-disable-next-line no-shadow
function renderPin(ads) {
  var pin = templatePin.cloneNode(true);
  pin.style = 'left: ' + (ads.location.x + PIN_SIZE[0] / 2) + 'px; top: ' + (ads.location.y + PIN_SIZE[1] / 2) + 'px;';


  pin.querySelector('img').src = ads.author.avatar;
  pin.querySelector('img').alt = ads.offer.title;

  return pin;
}

var map = document.querySelector('.map');

// определяет расположение пина
var getPosition = function (pin) {
  var top = pin.style.top;
  var left = pin.style.left;

  // избавляемся от px в конце и переводим в int
  top = parseInt(top.slice(0, -2))
  left = parseInt(left.slice(0, -2));

  // определяем середину для X координаты
  var xCenter = Math.round(left - SEARCH_PIN_SIZE[0] / 2)
  // и для Y если неактивен
  var yCenter = Math.round(top - SEARCH_PIN_SIZE[1] / 2);
  // Y если пин активен
  if (!(map.classList.contains('map--faded'))) {
    yCenter = Math.round(top - (SEARCH_PIN_SIZE[1] + 22) / 2);
  }

  return xCenter + ', ' + yCenter;
}

// Пин по дифолту
var defaultSerachPin = document.querySelector('.map__pin--main');
// Адрес по дифолту
var addressField = document.querySelector('#address');
addressField.value = getPosition(defaultSerachPin);

var fieldset = document.querySelector('fieldset');
var adForm = document.querySelector(".ad-form")
var adFormFieldset = adForm.querySelector('fieldset');
var adFormMapFilters = document.querySelectorAll('.map__filter');

// при открытии страницы все элементы кроме пина должны быть неактивны
var deactivatePage = function (map, fieldset, adFormFieldset, adFormMapFilters) {
  map.classList.add('map--faded');
  fieldset.disabled = true;
  adFormFieldset.disabled = true;

  for (var filter of adFormMapFilters) {
    filter.disabled = true;
  }
}

deactivatePage(map, fieldset, adFormFieldset, adFormMapFilters);

// активирует страницу
var activatePage = function () {
  map.classList.remove('map--faded');
  fieldset.disabled = false;
  adFormFieldset.disabled = false;
  adForm.classList.remove('ad-form--disabled');

  for (var filter of adFormMapFilters) {
    filter.disabled = false;
  }

  for (var i = 0; i < NUMBER_OF_ADS; i++) {
    fragment.appendChild(renderPin(ads[i]));
  }
  listElement.appendChild(fragment);

  // асайниит новый адрес пину после активации
  addressField.value = getPosition(defaultSerachPin);
}

// если нажата левая кнопка мыши
var clickPin = document.querySelector('.map__pin--main');
clickPin.addEventListener('mousedown', function (evt) {
  if (typeof evt === 'object' && evt.button === 0) {
    activatePage();
  }
  // TODO: когда удалять этот обработчик?
});

// если нажат enter
clickPin.addEventListener('keyup', function (evt) {
  if (evt.keyCode === 13) {
    activatePage();
  }
  // TODO: когда удалять этот обработчик?
});

// Назначение кастомного значения попапу с ошибкой валидации полей формы
// Поля: "Количество комнат" и "Количество мест"
var validateRoomsGuests = function (field) {
  if (selectedNumberRooms == 1 && selectedNumberGuests != 1) {
    field.setCustomValidity('1 комната должна быть для 1 гостя');
  } else if (selectedNumberRooms == 2 && (selectedNumberGuests > 0 && selectedNumberGuests < 3)) {
    field.setCustomValidity('2 комнаты должны быть для 1 или 2 гостей');
  } else if (selectedNumberRooms == 3 && (selectedNumberGuests > 0 && selectedNumberGuests < 4)) {
    field.setCustomValidity('3 комнаты должны быть для 1, 2 или 3 гостей');
  } else if (selectedNumberRooms == 100 && (selectedNumberGuests != 0)) {
    field.setCustomValidity('100 комнат должны быть не для гостей');
  }
}

// дифолтовые значения
var selectedNumberRooms = 1;
var selectedNumberGuests = 3;

var roomNumber = document.querySelector('#room_number');
roomNumber.addEventListener('change', function () {
  selectedNumberRooms = parseInt(this.value)

  validateRoomsGuests(capacity);
});

var capacity = document.querySelector('#capacity');
capacity.addEventListener('change', function () {
  selectedNumberGuests = parseInt(this.value);

  validateRoomsGuests(capacity);
});

var formSubmit = document.querySelector('.ad-form__submit');
formSubmit.addEventListener('submit', function () {
  // если не изменили дифолтовые значения полей "Количество комнат" и "Количество мест"
  validateRoomsGuests(capacity);
});

// console.log(ads);
// console.warn(map, map.getBoundingClientRect().x);

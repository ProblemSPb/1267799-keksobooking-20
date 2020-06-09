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

// переключение карту в активное состояние
// убираем класс .map--faded
var map = document.querySelector('.map');

map.classList.remove('map--faded');

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

for (var i = 0; i < NUMBER_OF_ADS; i++) {
  fragment.appendChild(renderPin(ads[i]));
}
listElement.appendChild(fragment);

// console.log(ads);
// console.warn(map, map.getBoundingClientRect().x);

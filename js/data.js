'use strict';

// eslint-disable-next-line no-unused-vars
(function () {

  // Функция создания массива из имеющихся данных
  window.data = {
    generateAds: function (maxAdsNumber) {
      function createAds(ind) {
        var TITLE = [
          'Просторная квартира',
          'Модный лофт',
          'В 5 минутах от метро',
          'Свежий ремонт',
          'Уютная студия',
          'Роскошный вариант с огромным метражом',
          'Отличный вариант в тихом районе',
          'Сдается срочно! Выгодное предложение!',
          'Хороший дом, тихие соседи',
        ];

        var PRICE_MIN = 500;
        var PRICE_MAX = 25000;
        var TYPE = ['palace', 'flat', 'house', 'bungalo'];
        var ROOMS_MIN = 1;
        var ROOMS_MAX = 5;
        var GUESTS_MIN = 0;
        var GUESTS_MAX = 10;
        var CHECKIN_OUT_TIME = ['12:00', '13:00', '14:00'];
        var FEATURES = [
          'wifi',
          'dishwasher',
          'parking',
          'washer',
          'elevator',
          'conditioner',
        ];

        var DESCRIPTION = [
          'Просторная квартира',
          'Модный лофт',
          'В 5 минутах от метро',
          'Свежий ремонт',
          'Уютная студия',
          'Роскошный вариант с огромным метражом',
          'Отличный вариант в тихом районе',
          'Сдается срочно! Выгодное предложение!',
          'Хороший дом, тихие соседи',
        ];

        var PHOTOS = [
          'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
          'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
          'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
        ];
        var COORDINATE_X_MIN = 0;
        var COORDINATE_X_MAX = 1140;
        var COORDINATE_Y_MIN = 130;
        var COORDINATE_Y_MAX = 630;

        function getRandomIntInclusive(min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        function getRandomElement(ads) {
          var element = Math.floor(Math.random() * ads.length);
          return ads[element];
        }

        var x = getRandomIntInclusive(COORDINATE_X_MIN, COORDINATE_X_MAX);
        var y = getRandomIntInclusive(COORDINATE_Y_MIN, COORDINATE_Y_MAX);

        return {
          author: {
            avatar: 'img/avatars/user0' + (ind + 1) + '.png',
          },
          offer: {
            title: getRandomElement(TITLE),
            address: x + ', ' + y,
            price: getRandomIntInclusive(PRICE_MIN, PRICE_MAX),
            type: getRandomElement(TYPE),
            rooms: getRandomIntInclusive(ROOMS_MIN, ROOMS_MAX),
            guests: getRandomIntInclusive(GUESTS_MIN, GUESTS_MAX),
            checkin: getRandomElement(CHECKIN_OUT_TIME),
            checkout: getRandomElement(CHECKIN_OUT_TIME),
            features: getRandomElement(FEATURES),
            description: getRandomElement(DESCRIPTION),
            photos: getRandomElement(PHOTOS),
          },
          location: {
            x: x,
            y: y,
          },
        };
      }
      return Array(maxAdsNumber)
        .fill(1)
        .map(function (_el, ind) {
          return createAds(ind);
        });
    }
  };
})();

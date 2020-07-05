/* eslint-disable no-console */
'use strict';

(function () {

  var selectedFilter = 'any';

  window.map.housingType.addEventListener('change', function () {
    selectedFilter = window.map.housingType.value;

    // скрыть открытую карточку объявления, если показана
    if (document.querySelector('.popup')) {
      window.card.closePopUp();
    }
    // удалить старые пины
    var pins = document.querySelectorAll('.pin__ads');
    for (var i = 0; i < pins.length; i++) {
      // eslint-disable-next-line no-unused-expressions
      pins[i].parentNode.removeChild(pins[i]);

    }

    console.log(selectedFilter);

    // по новой рендерим пины
    window.load(function (response) {
      // создаем пины
      var ads = response;

      // eslint-disable-next-line max-nested-callbacks
      if (selectedFilter !== 'any') {
        // eslint-disable-next-line max-nested-callbacks
        ads = response.filter(function (e) {
          return e.offer.type === selectedFilter;
        });
      }

      // console.log(ads);

      // если результат выдачи меньше 5, то показываем сколько есть
      var numberOfFilteredAds = window.map.numberOfAds;
      var adsLength = Object.keys(ads).length;

      if (adsLength < numberOfFilteredAds) {
        numberOfFilteredAds = adsLength;
      }

      // отрендерить новые
      // var listElement = document.querySelector('.map__pins');
      // var fragment = document.createDocumentFragment();
      for (var j = 0; j < numberOfFilteredAds; j++) {
        window.map.fragment.appendChild(window.pin.createPin(ads[j]));
      }
      window.map.listElement.appendChild(window.map.fragment);

      var newPins = document.querySelectorAll('.map__pin');

      for (var k = 0; k < newPins.length; k++) {
        newPins[k].classList.add('pin__ads');
      }

      var mainPin = document.querySelector('.map__pin--main');
      mainPin.classList.remove('pin__ads');

    }, function (message) {
      // eslint-disable-next-line no-console
      console.error(message);
    });

  });

})();

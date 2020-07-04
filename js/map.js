'use strict';

(function () {

  var TOKIO_MAP = document.querySelector('.map');
  var NUMBER_OF_ADS = 5;
  // Фильтрация объявлений - весь блок
  var fieldset = document.querySelector('.map__filters-container');
  // Фильтрация объявлений - тип жилья
  var housingType = document.querySelector('#housing-type');

  var listElement = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();


  window.map = {
    tokioMap: TOKIO_MAP,
    numberOfAds: NUMBER_OF_ADS,
    housingType: housingType,
    listElement: listElement,
    fragment: fragment,
    deactivateMap: function deactivateMap() {
      window.map.tokioMap.classList.add('map--faded');
      fieldset.disabled = true;
    },
    activateMap: function activateMap() {
      // var listElement = document.querySelector('.map__pins');
      // var fragment = document.createDocumentFragment();

      window.map.tokioMap.classList.remove('map--faded');
      fieldset.disabled = false;

      window.load(function (response) {

        // создаем пины
        var ads = response;

        for (var i = 0; i < NUMBER_OF_ADS; i++) {
          fragment.appendChild(window.pin.createPin(ads[i]));
        }
        listElement.appendChild(fragment);

        var newPins = document.querySelectorAll('.map__pin');

        for (var j = 0; j < newPins.length; j++) {
          newPins[j].classList.add('pin__ads');
        }

        var mainPin = document.querySelector('.map__pin--main');
        mainPin.classList.remove('pin__ads');

      }, function (message) {
        // eslint-disable-next-line no-console
        console.error(message);
      });
    }
  };

}());

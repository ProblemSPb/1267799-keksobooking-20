'use strict';

(function () {

  var TOKIO_MAP = document.querySelector('.map');
  var NUMBER_OF_ADS = 8;
  // fieldset - фильтры на карте
  var fieldset = document.querySelector('fieldset');


  window.map = {
    tokioMap: TOKIO_MAP,
    deactivateMap: function deactivateMap() {
      window.map.tokioMap.classList.add('map--faded');
      fieldset.disabled = true;
    },
    activateMap: function activateMap() {
      var listElement = document.querySelector('.map__pins');
      var fragment = document.createDocumentFragment();

      window.map.tokioMap.classList.remove('map--faded');
      fieldset.disabled = false;

      window.load(function (response) {

        // создаем пины
        var ads = response;

        for (var i = 0; i < NUMBER_OF_ADS; i++) {
          fragment.appendChild(window.pin.createPin(ads[i]));
        }
        listElement.appendChild(fragment);
      }, function (message) {
        // eslint-disable-next-line no-console
        console.error(message);
      });
    }
  };

}());

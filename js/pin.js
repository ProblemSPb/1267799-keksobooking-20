'use strict';

(function () {

  var TOKIO_MAP = document.querySelector('.map');

  window.pin = {
    tokioMap: TOKIO_MAP,
    createPin: function (ad) {
      var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
      var PIN_SIZE = [50, 70];

      var pin = templatePin.cloneNode(true);
      pin.style = 'left: ' + (ad.location.x + PIN_SIZE[0] / 2) + 'px; top: ' + (ad.location.y + PIN_SIZE[1] / 2) + 'px;';


      pin.querySelector('img').src = ad.author.avatar;
      pin.querySelector('img').alt = ad.offer.title;

      return pin;
    },

    // определяет расположение пина
    getPosition: function (pin) {
      // пин-маффин
      var SEARCH_PIN_SIZE = [65, 65];

      var top = pin.style.top;
      var left = pin.style.left;

      // избавляемся от px в конце и переводим в int
      top = parseInt(top.slice(0, -2), 10);
      left = parseInt(left.slice(0, -2), 10);

      // определяем середину для X координаты
      var xCenter = Math.round(left - SEARCH_PIN_SIZE[0] / 2);
      // и для Y если неактивен
      var yCenter = Math.round(top - SEARCH_PIN_SIZE[1] / 2);
      // Y если пин активен
      if (!(TOKIO_MAP.classList.contains('map--faded'))) {
        yCenter = Math.round(top - (SEARCH_PIN_SIZE[1] + 22) / 2);
      }

      return xCenter + ', ' + yCenter;
    }
  };
})();


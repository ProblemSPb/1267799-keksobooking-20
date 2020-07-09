'use strict';

(function () {

  // Пин по дифолту
  var defaultSerachPin = document.querySelector('.map__pin--main');

  window.pin = {
    defaultSerachPin: defaultSerachPin,
    createPin: function (ad) {
      var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
      var PIN_SIZE = [50, 70];

      var pin = templatePin.cloneNode(true);
      pin.style = 'left: ' + (ad.location.x + PIN_SIZE[0] / 2) + 'px; top: ' + (ad.location.y + PIN_SIZE[1] / 2) + 'px;';


      pin.querySelector('img').src = ad.author.avatar;
      pin.querySelector('img').alt = ad.offer.title;

      pin.addEventListener('mousedown', function (evt) {
        if (typeof evt === 'object' && evt.button === 0) {
          if (document.querySelector('.popup')) {
            document.querySelector('.popup').remove();
          }
          console.log('клик по пину');
          window.map.tokioMap.insertBefore(window.card.openPopUp(ad), window.map.fieldset);
        }
      });


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
      if (!(window.map.tokioMap.classList.contains('map--faded'))) {
        yCenter = Math.round(top - (SEARCH_PIN_SIZE[1] + 22) / 2);
      }

      return xCenter + ', ' + yCenter;
    }
  };
})();


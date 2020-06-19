
'use strict';

(function () {

  var NUMBER_OF_ADS = 8;

  // Пин по дифолту
  var defaultSerachPin = document.querySelector('.map__pin--main');
  // Адрес по дифолту
  var addressField = document.querySelector('#address');
  addressField.value = window.pin.getPosition(defaultSerachPin);

  var fieldset = document.querySelector('fieldset');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelector('fieldset');
  var mainFormFilters = document.querySelectorAll('.map__filter');

  window.page = {
    // при открытии страницы все элементы кроме пина должны быть неактивны
    deactivatePage: function () {
      window.pin.tokioMap.classList.add('map--faded');
      fieldset.disabled = true;
      adFormFieldset.disabled = true;

      mainFormFilters.forEach(function (mainFormfilter) {
        mainFormfilter.disabled = true;
      });
    },
    // активирует страницу
    activatePage: function () {
      var listElement = document.querySelector('.map__pins');
      var fragment = document.createDocumentFragment();

      window.pin.tokioMap.classList.remove('map--faded');
      fieldset.disabled = false;
      adFormFieldset.disabled = false;
      adForm.classList.remove('ad-form--disabled');

      mainFormFilters.forEach(function (mainFormfilter) {
        mainFormfilter.disabled = false;
      });

      // создаем пины
      var ads = window.data.generateAds(NUMBER_OF_ADS);

      for (var i = 0; i < NUMBER_OF_ADS; i++) {
        // eslint-disable-next-line no-undef
        fragment.appendChild(window.pin.createPin(ads[i]));
      }
      listElement.appendChild(fragment);

      // асайниит новый адрес пину после активации
      addressField.value = window.pin.getPosition(defaultSerachPin);
    }
  };

  // если нажата левая кнопка мыши
  var clickPin = document.querySelector('.map__pin--main');
  clickPin.addEventListener('mousedown', function (evt) {
    if (typeof evt === 'object' && evt.button === 0) {
      window.page.activatePage();
    }
  });

  // если нажат enter
  clickPin.addEventListener('keyup', function (evt) {
    if (evt.keyCode === 13) {
      window.page.activatePage();
    }
  });

})();

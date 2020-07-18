'use strict';

(function () {

  // размеры пина поиска
  var PinSize = {
    SIDE_LENGTH: 62,
    HALF: 62 / 2,
    HEIGHT: 84,
  };

  // границы карты Y
  var YBound = {
    TOP: 130,
    BOTTOM: 704
  };

  var mapLayout = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var addressField = document.querySelector('#address');

  // границы карты X
  var XBound = {
    left: 0,
    right: mapLayout.offsetWidth,
  };

  // координаты (относительно документа)
  var PageOffset = {
    left: 0,
    top: 0
  };

  // записываем координаты пина поиска в поле Адрес
  function setAddress() {
    var pinX = mainPin.offsetLeft + PinSize.SIDE_LENGTH / 2;
    var pinY = mainPin.offsetTop + PinSize.HEIGHT;
    addressField.value = pinX + ', ' + pinY;
  }

  function moveMainPin(evt) {
    var endCoords = {
      x: evt.clientX - PageOffset.left,
      y: evt.clientY - PageOffset.top,
    };

    // задаем границы по X
    if (endCoords.x + PinSize.HALF <= XBound.left) {
      mainPin.style.left = XBound.left - PinSize.HALF + 'px';
    } else if (endCoords.x + PinSize.HALF >= XBound.right) {
      mainPin.style.left = XBound.right - PinSize.HALF + 'px';
    } else {
      mainPin.style.left = endCoords.x + 'px';
    }

    // задаем границы по Y
    if (endCoords.y + PinSize.HEIGHT <= YBound.TOP) {
      mainPin.style.top = YBound.TOP - PinSize.HEIGHT + 'px';
    } else if (endCoords.y + PinSize.HEIGHT >= YBound.BOTTOM) {
      mainPin.style.top = YBound.BOTTOM - PinSize.HEIGHT + 'px';
    } else {
      mainPin.style.top = endCoords.y + 'px';
    }

    setAddress();
  }

  // ивент листенеры для drag-n-drop
  function onMainPinMousedown(evt) {
    if (evt.button === 0) {
      evt.preventDefault();

      setAddress();

      XBound.right = mapLayout.offsetWidth;

      PageOffset.left = evt.clientX - mainPin.offsetLeft;
      PageOffset.top = evt.clientY - mainPin.offsetTop;

      document.addEventListener('mousemove', onMainPinMousemove);
      document.addEventListener('mouseup', onMainPinMouseup);
    }
  }

  function onMainPinMousemove(moveEvt) {
    moveEvt.preventDefault();

    moveMainPin(moveEvt);
  }

  function onMainPinMouseup(upEvt) {
    upEvt.preventDefault();

    moveMainPin(upEvt);

    document.removeEventListener('mousemove', onMainPinMousemove);
    document.removeEventListener('mouseup', onMainPinMouseup);
  }

  mainPin.addEventListener('mousedown', onMainPinMousedown);

  window.dragpin = {
    setAddress: setAddress
  };

})();

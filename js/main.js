'use strict';

// деактивируем страницу по дифолту
window.map.deactivateMap();
window.form.deactivateForm();

var isActivePage = true;

// если нажата левая кнопка мыши
var clickPin = document.querySelector('.map__pin--main');
clickPin.addEventListener('mousedown', function handler(evt) {
  if (typeof evt === 'object' && evt.button === 0) {
    if (isActivePage) {
      window.map.activateMap();
      window.form.activateForm();
      // меняем статус страницы, чтобы листенер не срабатывал на активной странице
      isActivePage = false;
    }
  }
});


// если нажат enter
clickPin.addEventListener('keyup', function (evt) {
  if (evt.keyCode === 13) {
    if (isActivePage) {
      window.map.activateMap();
      window.form.activateForm();
      isActivePage = false;
    }
  }
});

// document.removeEventListener('mousedown', handler(evt));

// console.log(ads);
// console.warn(map, map.getBoundingClientRect().x);

// disable button
// show loader

// check response
// 0 results - ? hide loader
// error - hide loader
// success - activate map, activate form
// hide loader
// enable button

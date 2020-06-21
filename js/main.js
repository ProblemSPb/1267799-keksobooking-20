'use strict';

// деактивируем страницу по дифолту
// window.page.deactivatePage();
window.map.deactivateMap();
window.form.deactivateForm();

// если нажата левая кнопка мыши
var clickPin = document.querySelector('.map__pin--main');
clickPin.addEventListener('mousedown', function (evt) {
  if (typeof evt === 'object' && evt.button === 0) {
    window.map.activateMap();
    window.form.activateForm();
  }
});

// если нажат enter
clickPin.addEventListener('keyup', function (evt) {
  if (evt.keyCode === 13) {
    window.map.activateMap();
    window.form.activateForm();
  }
});


// console.log(ads);
// console.warn(map, map.getBoundingClientRect().x);

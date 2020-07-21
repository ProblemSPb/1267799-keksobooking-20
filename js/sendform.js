'use strict';

(function () {

  var mainTag = document.querySelector('main');

  window.upload = function (data) {
    var URL = 'https://javascript.pages.academy/keksobooking';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      sendFormSuccess();
    });
    if (xhr.status === 400) {
      sendFormError();
    }
    xhr.open('POST', URL);
    xhr.send(data);
  };

  // ивент листенер для формы
  window.form.adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var formData = new FormData(window.form.adForm);
    window.upload(formData);

    window.card.closePopUp();

    // удалить старые пины
    var pins = document.querySelectorAll('.pin__ads');
    for (var i = 0; i < pins.length; i++) {
      // eslint-disable-next-line no-unused-expressions
      pins[i].parentNode.removeChild(pins[i]);
    }

    window.form.clearForm();
    window.map.deactivateMap();
    window.form.deactivateForm();

  });

  // сообщение об успешной отправке формы
  function sendFormSuccess() {
    var templateSuccessMsg = document.querySelector('#success').content.querySelector('.success');
    var successMsg = templateSuccessMsg.cloneNode(true);
    mainTag.appendChild(successMsg);

    // если нажать esc
    document.addEventListener('keyup', function (evt) {
      if (evt.keyCode === 27) {
        var successMsgTag = document.querySelector('.success');
        successMsgTag.parentNode.removeChild(successMsgTag);
      }
    });
    // клик по произвольной области
    document.addEventListener('mousedown', function (evt) {
      if (typeof evt === 'object' && evt.button === 0) {
        var successMsgTag = document.querySelector('.success');
        successMsgTag.parentNode.removeChild(successMsgTag);
      }
    });
  }

  // сообщение об ошибке отправки формы
  function sendFormError() {
    var templateErrorMsg = document.querySelector('#error').content.querySelector('.error');
    var errorMsg = templateErrorMsg.cloneNode(true);
    mainTag.appendChild(errorMsg);

    // закрытие сообщения об ошибке
    var tryAgainButton = document.querySelector('.error__button');
    tryAgainButton.addEventListener('mousedown', function (evt) {
      if (typeof evt === 'object' && evt.button === 0) {
        var errorMsgTag = document.querySelector('.error');
        errorMsgTag.parentNode.removeChild(errorMsgTag);
      }
    });
    // если нажать esc
    document.addEventListener('keyup', function (evt) {
      if (evt.keyCode === 27) {
        var errorMsgTag = document.querySelector('.error');
        errorMsgTag.parentNode.removeChild(errorMsgTag);
      }
    });
    // клик по произвольной области
    document.addEventListener('mousedown', function (evt) {
      if (typeof evt === 'object' && evt.button === 0) {
        var errorMsgTag = document.querySelector('.error');
        errorMsgTag.parentNode.removeChild(errorMsgTag);
      }
    });
  }

})();

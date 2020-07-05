'use strict';

(function () {

  // создание карточки объявления
  function openPopUp(ads) {

    if (ads.length > 0) {
      var templateAdCard = document.querySelector('#card').content.querySelector('.popup');
      var adCard = templateAdCard.cloneNode(true);

      adCard.querySelector('.popup__title').innerHTML = ads[0].offer.title;
      adCard.querySelector('.popup__text--address').innerHTML = ads[0].offer.address;
      adCard.querySelector('.popup__text--price').innerHTML = ads[0].offer.price + '₽/ночь';

      // Тип жилья
      switch (ads[0].offer.type) {
        case (ads[0].offer.type === 'flat'):
          adCard.querySelector('.popup__type').innerHTML = 'Квартира';
          break;
        case (ads[0].offer.type === 'bungalo'):
          adCard.querySelector('.popup__type').innerHTML = 'Бунгало';
          break;
        case (ads[0].offer.type === 'house'):
          adCard.querySelector('.popup__type').innerHTML = 'Дом';
          break;
        case (ads[0].offer.type === 'palace'):
          adCard.querySelector('.popup__type').innerHTML = 'Дворец';
          break;
      }

      adCard.querySelector('.popup__text--capacity').innerHTML = ads[0].offer.rooms + ' комнаты для ' + ads[0].offer.guests + ' гостей';
      adCard.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + ads[0].offer.checkin + ', выезд до ' + ads[0].offer.checkout;
      // если какой-то features нет в объявлении, удалить соотвествующий li
      if (ads[0].offer.features.indexOf('wifi') === -1) {
        adCard.querySelector('.popup__feature--wifi').parentNode.removeChild(adCard.querySelector('.popup__feature--wifi'));
      }
      if (ads[0].offer.features.indexOf('dishwasher') === -1) {
        adCard.querySelector('.popup__feature--dishwasher').parentNode.removeChild(adCard.querySelector('.popup__feature--dishwasher'));
      }
      if (ads[0].offer.features.indexOf('parking') === -1) {
        adCard.querySelector('.popup__feature--parking').parentNode.removeChild(adCard.querySelector('.popup__feature--parking'));
      }
      if (ads[0].offer.features.indexOf('washer') === -1) {
        adCard.querySelector('.popup__feature--washer').parentNode.removeChild(adCard.querySelector('.popup__feature--washer'));
      }
      if (ads[0].offer.features.indexOf('elevator') === -1) {
        adCard.querySelector('.popup__feature--elevator').parentNode.removeChild(adCard.querySelector('.popup__feature--elevator'));
      }
      if (ads[0].offer.features.indexOf('conditioner') === -1) {
        adCard.querySelector('.popup__feature--conditioner').parentNode.removeChild(adCard.querySelector('.popup__feature--conditioner'));
      }

      // если есть description, то показать; иначе - удалить
      if (ads[0].offer.description) {
        adCard.querySelector('.popup__description').innerHTML = ads[0].offer.description;
      } else {
        adCard.querySelector('.popup__description').parentNode.removeChild(adCard.querySelector('.popup__description'));

      }

      // добавить фотки из массива
      adCard.querySelector('.popup__photo').src = ads[0].offer.photos[0];
      // если больше 1 фото, добавить img элементы для каждого дополнительного фото
      if (ads[0].offer.photos.length > 1) {
        var imgElement = adCard.querySelector('.popup__photo');

        for (var i = 1; i < ads[0].offer.photos.length; i++) {
          var newImg = imgElement.cloneNode(true);
          newImg.src = ads[0].offer.photos[i];
          adCard.querySelector('.popup__photos').appendChild(newImg);
        }
      }

      adCard.querySelector('.popup__avatar').src = ads[0].author.avatar;

    }

    // закрыть карточку при клике на крестик
    var clickCross = adCard.querySelector('.popup__close');
    // если нажата левая кнопка мыши
    clickCross.addEventListener('mousedown', function (evt) {
      if (typeof evt === 'object' && evt.button === 0) {
        window.card.closePopUp();
      }
    });
    // если нажат enter
    clickCross.addEventListener('keyup', function (evt) {
      if (evt.keyCode === 13) {
        window.card.closePopUp();
      }
    });

    return adCard;

  }


  // скрытие карточки объявления
  function closePopUp() {
    var openedCard = document.querySelector('.popup');
    openedCard.parentNode.removeChild(openedCard);
  }

  window.card = {
    openPopUp: openPopUp,
    closePopUp: closePopUp
  };
}());

'use strict';

(function () {

  // функция определения типа жилья в объявлении
  // и добавления этого типа к popup карточке
  function detectHousingType(adItem, element) {
    switch (adItem) {
      case (adItem === 'flat'):
        element.querySelector('.popup__type').innerHTML = 'Квартира';
        break;
      case (adItem === 'bungalo'):
        element.querySelector('.popup__type').innerHTML = 'Бунгало';
        break;
      case (adItem === 'house'):
        element.querySelector('.popup__type').innerHTML = 'Дом';
        break;
      case (adItem === 'palace'):
        element.querySelector('.popup__type').innerHTML = 'Дворец';
        break;
    }
  }

  // функция проверки features в объявлении
  // если такой фичи в объявлении нет, соответствующий li тег будет удален из html
  // function checkFeatures(offer, feature, adCard) {
  //   if (!(offer.features.find(currentValue => currentValue === feature))) {
  //     adCard.querySelector('.popup__feature--' + feature).parentNode.removeChild(adCard.querySelector('.popup__feature--' + feature));
  //   }
  // }

  function checkFeatures(offer, feature, adCard) {
    if (offer.features.indexOf(feature) === -1) {
      adCard.querySelector('.popup__feature--' + feature).parentNode.removeChild(adCard.querySelector('.popup__feature--' + feature));
    }
  }

  // создание карточки объявления
  function openPopUp(ad) {

    // var { offer, author } = ads[0];

    // var offer = ads[0].offer;
    // var author = ads[0].author;

    var offer = ad.offer;
    var author = ad.author;

    // if (ads.length > 0) {
    if (ad) {

      var templateAdCard = document.querySelector('#card').content.querySelector('.popup');
      var adCard = templateAdCard.cloneNode(true);

      adCard.querySelector('.popup__title').innerHTML = offer.title;
      adCard.querySelector('.popup__text--address').innerHTML = offer.address;
      adCard.querySelector('.popup__text--price').innerHTML = offer.price + '₽/ночь';

      // Тип жилья
      detectHousingType(offer.type, adCard);

      adCard.querySelector('.popup__text--capacity').innerHTML = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
      adCard.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;

      checkFeatures(offer, 'wifi', adCard);
      checkFeatures(offer, 'dishwasher', adCard);
      checkFeatures(offer, 'parking', adCard);
      checkFeatures(offer, 'washer', adCard);
      checkFeatures(offer, 'elevator', adCard);
      checkFeatures(offer, 'conditioner', adCard);

      // если есть description, то показать; иначе - удалить
      if (offer.description) {
        adCard.querySelector('.popup__description').innerHTML = offer.description;
      } else {
        adCard.querySelector('.popup__description').parentNode.removeChild(adCard.querySelector('.popup__description'));

      }

      // если фото нет, удаляем тег, если есть - показываем фотки
      if (offer.photos.length === 0) {
        adCard.querySelector('.popup__photo').parentNode.removeChild(adCard.querySelector('.popup__photo'));
      } else {
        adCard.querySelector('.popup__photo').src = offer.photos[0];
        // если больше 1 фото, добавить img элементы для каждого дополнительного фото
        var imgElement = adCard.querySelector('.popup__photo');

        for (var i = 1; i < offer.photos.length; i++) {
          var newImg = imgElement.cloneNode(true);
          newImg.src = offer.photos[i];
          adCard.querySelector('.popup__photos').appendChild(newImg);
        }
      }

      adCard.querySelector('.popup__avatar').src = author.avatar;
    }

    // закрыть карточку при клике на крестик
    var cross = adCard.querySelector('.popup__close');
    // если нажата левая кнопка мыши
    cross.addEventListener('mousedown', function (evt) {
      if (typeof evt === 'object' && evt.button === 0) {
        window.card.closePopUp();
      }
    });
    // если нажат enter
    cross.addEventListener('keyup', function (evt) {
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

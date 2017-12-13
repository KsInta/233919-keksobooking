'use strict';

(function () {
  var map = document.querySelector('.map');

  var renderAds = function (parent, adObject) {
    var paragraph = parent.querySelectorAll('p');

    parent.querySelector('h3').textContent = adObject.offer.title;
    paragraph[0].querySelector('small').textContent = adObject.offer.address;
    paragraph[1].textContent = adObject.offer.price + '\u20BD/ночь';
    switch (adObject.offer.type) {
      case 'flat': parent.querySelector('h4').textContent = 'Квартира';
        break;
      case 'house': parent.querySelector('h4').textContent = 'Дом';
        break;
      case 'bungalo': parent.querySelector('h4').textContent = 'Бунгало';
        break;
    }
    paragraph[2].textContent = adObject.offer.rooms + ' комнаты для ' + adObject.offer.guests + ' гостей';
    paragraph[3].textContent = 'Заезд после ' + adObject.offer.checkin + ', выезд до ' + adObject.offer.checkout;
    parent.querySelector('.popup__features').innerHTML = '';

    for (var i = 0; i < adObject.offer.features.length; i++) {
      var feature = document.createElement('li');
      feature.className = 'feature feature--' + adObject.offer.features[i];
      parent.querySelector('.popup__features').appendChild(feature);
    }

    parent.querySelector('.popup__features + p').textContent = adObject.offer.description;
    parent.querySelector('.popup__avatar').setAttribute('src', adObject.author.avatar);
  };

  var showCard = function (adObject) {
    var template = document.querySelector('template').content;
    var mapCard = template.querySelector('.map__card').cloneNode(true);

    renderAds(mapCard, adObject);

    return mapCard;
  };

  var createCard = function (arrObjects) {
    var fragment = document.createDocumentFragment();

    fragment.appendChild(showCard(arrObjects));

    map.insertBefore(fragment, map.children[1]);
  };

  createCard(window.data.ads[0]);

  var popup = map.querySelector('.map__card');
  popup.classList.add('hidden');

  window.card = {
    changePopup: function (target) {
      for (var i = 0; i < window.data.ads.length; i++) {
        if (target.firstChild.getAttribute('src') === window.data.ads[i].author.avatar) {
          renderAds(popup, window.data.ads[i]);
        }
      }
    }
  };
})();

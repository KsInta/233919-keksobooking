'use strict';

(function () {
  window.card = {
    renderAds: function (parent, adObject) {
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
    },

    renderMapCard: function (adObject) {
      var template = document.querySelector('template').content;
      var mapCard = template.querySelector('.map__card').cloneNode(true);

      window.card.renderAds(mapCard, adObject);

      return mapCard;
    }
  };
})();

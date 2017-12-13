'use strict';

(function () {
  var adTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var adTypes = ['flat', 'house', 'bungalo'];
  var adCheckins = ['12:00', '13:00', '14:00'];
  var adCheckouts = ['12:00', '13:00', '14:00'];
  var adFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var ads = [];

  var createAvatarUrl = function (adNumber) {
    var avatarNull = (adNumber < 10) ? 0 : false;
    var avatarUrl = 'img/avatars/user' + avatarNull + adNumber + '.png';

    return avatarUrl;
  };

  var createAd = function (adNumber) {
    var adObject = {};
    adObject.author = {};
    adObject.offer = {};
    adObject.location = {};
    var locationX = window.randomValue.getRandomNumber(300, 900);
    var locationY = window.randomValue.getRandomNumber(100, 500);
    var minPrice = 1000;
    var maxPrice = 1000000;
    var minRooms = 1;
    var maxRooms = 5;
    var minGuests = 1;
    var maxGuests = 20;
    var avatar = createAvatarUrl(adNumber);
    var title = adTitles.splice(window.randomValue.getRandomNumber(0, adTitles.length - 1), 1).join();
    var address = locationX + ', ' + locationY;
    var price = window.randomValue.getRandomNumber(minPrice, maxPrice);
    var type = window.randomValue.getRandomArrayElement(adTypes);
    var rooms = window.randomValue.getRandomNumber(minRooms, maxRooms);
    var guests = window.randomValue.getRandomNumber(minGuests, maxGuests);
    var checkin = adCheckins[window.randomValue.getRandomNumber(0, adCheckins.length - 1)];
    var checkout = adCheckouts[window.randomValue.getRandomNumber(0, adCheckouts.length - 1)];
    var features = window.randomValue.getRandomArray(adFeatures);
    var description = '';
    var photos = [];

    adObject.author.avatar = avatar;
    adObject.offer.title = title;
    adObject.offer.address = address;
    adObject.offer.price = price;
    adObject.offer.type = type;
    adObject.offer.rooms = rooms;
    adObject.offer.guests = guests;
    adObject.offer.checkin = checkin;
    adObject.offer.checkout = checkout;
    adObject.offer.features = features;
    adObject.offer.description = description;
    adObject.offer.photos = photos;
    adObject.location.x = locationX;
    adObject.location.y = locationY;

    return adObject;
  };

  var createAdsArray = function (adsAmount) {
    for (var k = 1; k <= adsAmount; k++) {
      ads.push(createAd(k));
    }

    return ads;
  };

  window.data = {
    ads: createAdsArray(8)
  };
})();

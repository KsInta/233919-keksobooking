'use strict';

(function () {
  var adTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var adTypes = ['flat', 'house', 'bungalo'];
  var adCheckins = ['12:00', '13:00', '14:00'];
  var adCheckouts = ['12:00', '13:00', '14:00'];
  var adFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var ads = [];

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  };

  var getRandomArray = function (parentArray) {
    var arrayCopy = parentArray.slice();
    var newArray = [];
    var newArrayLength = getRandomNumber(0, arrayCopy.length);
    for (var j = 0; j < newArrayLength; j++) {
      newArray[j] = arrayCopy.splice(getRandomNumber(0, arrayCopy.length), 1).join();
    }

    return arrayCopy;
  };

  var getRandomArrayElement = function (array) {
    var randomElement = array[getRandomNumber(0, array.length - 1)];

    return randomElement;
  };

  var createAvatarUrl = function (adNumber) {
    var avatarNull = (adNumber < 10) ? 0 : false;
    var avatarUrl = 'img/avatars/user' + avatarNull + adNumber + '.png';

    return avatarUrl;
  };

  var createAd = function (adNumber) {
    var adObject = { };
    adObject.author = { };
    adObject.offer = { };
    adObject.location = { };
    var locationX = getRandomNumber(300, 900);
    var locationY = getRandomNumber(100, 500);
    var minPrice = 1000;
    var maxPrice = 1000000;
    var minRooms = 1;
    var maxRooms = 5;
    var minGuests = 1;
    var maxGuests = 20;
    var avatar = createAvatarUrl(adNumber);
    var title = adTitles.splice(getRandomNumber(0, adTitles.length - 1), 1).join();
    var address = locationX + ', ' + locationY;
    var price = getRandomNumber(minPrice, maxPrice);
    var type = getRandomArrayElement(adTypes);
    var rooms = getRandomNumber(minRooms, maxRooms);
    var guests = getRandomNumber(minGuests, maxGuests);
    var checkin = adCheckins[getRandomNumber(0, adCheckins.length - 1)];
    var checkout = adCheckouts[getRandomNumber(0, adCheckouts.length - 1)];
    var features = getRandomArray(adFeatures);
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

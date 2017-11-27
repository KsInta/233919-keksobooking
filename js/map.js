'use strict';

var adTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var adTypes = ['flat', 'house', 'bungalo'];
var adCheckins = ['12:00', '13:00', '14:00'];
var adCheckouts = ['12:00', '13:00', '14:00'];
var adFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var pinTemplate = getComputedStyle(document.querySelector('.map__pin img'));
var buttonTemplate = document.querySelector('template').content.querySelector('.map__pin');
var pinHeight = parseInt(pinTemplate.height, 10);
var fragmentPin = document.createDocumentFragment();
var fragmentOffer = document.createDocumentFragment();
var similarOfferTemplate = document.querySelector('template').content.querySelector('article.map__card');
var map = document.querySelector('.map');
var mapPin = map.querySelector('.map__pins');
var ads = [];
var adsAmount = 8;
var avatarPictures = [];

for (var i = 0; i < adsAmount; i++) {
  avatarPictures[i] = i + 1;
}

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

var getRandomArray = function (parentArray) {
  var arrayCopy = parentArray.slice();
  var newArray = [];
  var newArrayLength = getRandomNumber(0, arrayCopy.length - 1);
  for (var j = 0; j < newArrayLength; j++) {
    newArray[j] = arrayCopy.splice(getRandomNumber(0, arrayCopy.length - 1), 1).join();
  }

  return newArray;
};

var getRandomArrayElement = function (array) {
  var randomElement = array[getRandomNumber(0, array.length - 1)];

  return randomElement;
};

var createAd = function () {
  var locationX = getRandomNumber(300, 900);
  var locationY = getRandomNumber(100, 500);
  var minPrice = 1000;
  var maxPrice = 1000000;
  var minRooms = 1;
  var maxRooms = 5;
  var minGuests = 1;
  var maxGuests = 20;
  var adObject = {
    'author': {
      'avatar': 'img/avatars/user0' + avatarPictures.splice(getRandomNumber(0, avatarPictures.length - 1), 1) + '.png'
    },
    'offer': {
      'title': adTitles.splice(getRandomNumber(0, adTitles.length - 1), 1).join(),
      'address': locationX + ', ' + locationY,
      'price': getRandomNumber(minPrice, maxPrice),
      'type': getRandomArrayElement(adTypes),
      'rooms': getRandomNumber(minRooms, maxRooms),
      'guests': getRandomNumber(minGuests, maxGuests),
      'checkin': adCheckins[getRandomNumber(0, adCheckins.length - 1)],
      'checkout': adCheckouts[getRandomNumber(0, adCheckouts.length - 1)],
      'features': getRandomArray(adFeatures),
      'description': '',
      'photos': []
    },
    'location': {
      'x': locationX,
      'y': locationY
    }
  };

  return adObject;
};

var createAdsArray = function (adsAmount) {
  for (var k = 0; k < adsAmount; k++) {
    ads.push(createAd());
  }

  return ads;
};

createAdsArray(8);

document.querySelector('.map').classList.remove('map--faded');

var createAdsMarker = function (adsArray) {
  for (var l = 0; l < adsArray.length; l++) {
    var adsPin = buttonTemplate.cloneNode(true);
    var pinInitialX = adsArray[l].location.x;
    var pinInitialY = adsArray[l].location.y - pinHeight;
    adsPin.setAttribute('style', 'left: ' + String(pinInitialX) + 'px; top: ' + String(pinInitialY) + 'px;');
    adsPin.querySelector('img').src = adsArray[l].author.avatar;
    mapPin.appendChild(adsPin);
  }
};

createAdsMarker(ads);

mapPin.appendChild(fragmentPin);

var renderAds = function (adObject) {
  var adElement = similarOfferTemplate.cloneNode(true);
  var paragraph = adElement.querySelectorAll('p');

  adElement.querySelector('h3').textContent = adObject.offer.title;
  paragraph[0].querySelector('small').textContent = adObject.offer.address;
  paragraph[1].textContent = adObject.offer.price + '\u20BD/ночь';
  switch (adObject.offer.type) {
    case 'flat': adElement.querySelector('h4').textContent = 'Квартира';
      break;
    case 'house': adElement.querySelector('h4').textContent = 'Дом';
      break;
    case 'bungalo': adElement.querySelector('h4').textContent = 'Бунгало';
      break;
  }
  paragraph[2].textContent = adObject.offer.rooms + ' комнаты для ' + adObject.offer.guests + ' гостей';
  paragraph[3].textContent = 'Заезд после ' + adObject.offer.checkin + ', выезд до ' + adObject.offer.checkout;
  adElement.querySelector('.popup__features').innerHTML = '';

  for (var m = 0; m < adObject.offer.features.length; m++) {
    var feature = document.createElement('li');
    feature.className = 'feature feature--' + adObject.offer.features[m];
    adElement.querySelector('.popup__features').appendChild(feature);
  }

  adElement.querySelector('.popup__features + p').textContent = adObject.offer.description;
  adElement.querySelector('.popup__avatar').setAttribute('src', adObject.author.avatar);

  return adElement;
};

for (var m = 0; m < ads.length; m++) {
  fragmentOffer.appendChild(renderAds(ads[m]));
}

map.appendChild(fragmentOffer);

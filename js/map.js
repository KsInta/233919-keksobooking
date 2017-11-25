'use strict';

var offerTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var offerTypes = ['flat', 'house ', 'bungalo'];
var offerCheckins = ['12:00', '13:00', '14:00'];
var offerCheckouts = ['12:00', '13:00', '14:00'];
var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var offersAmount = 8;

var pinWidth = 40;
var pinHeight = 40;
var mapPin = document.querySelector('.map__pins');
var fragmentPin = document.createDocumentFragment();
var fragmentOffer = document.createDocumentFragment();
var similarOfferTemplate = document.querySelector('template').content.querySelector('article.map__card');
var map = document.querySelector('.map');
var offers = [];
var avatarPictures = [];

for (var i = 0; i < offersAmount; i++) {
  avatarPictures[i] = i + 1;
}

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomArray = function (parentArray) {
  var arrayCopy = parentArray.slice();
  var newArray = [];
  var newArrayLength = getRandomValue(0, arrayCopy.length);
  for (var j = 0; j <= newArrayLength; j++) {
    newArray[j] = arrayCopy.splice(getRandomValue(0, arrayCopy.length), 1).join();
  }

  return newArray;
};

var createOffer = function () {
  var locationX = getRandomValue(300, 900);
  var locationY = getRandomValue(100, 500);
  var offerObject = {
    'author': {
      'avatar': 'img/avatars/user0' + avatarPictures.splice(getRandomValue(0, avatarPictures.length), 1) + '.png'
    },
    'offer': {
      'title': offerTitles[getRandomValue(0, offerTitles.length)],
      'address': '(' + String(locationX) + ', ' + String(locationY) + ')',
      'price': getRandomValue(1000, 1000000),
      'type': offerTypes[getRandomValue(0, offerTypes.length)],
      'rooms': getRandomValue(1, 5),
      'guests': getRandomValue(1, 20),
      'checkin': offerCheckins[getRandomValue(0, offerCheckins.length)],
      'checkout': offerCheckouts[getRandomValue(0, offerCheckouts.length)],
      'features': getRandomArray(offerFeatures),
      'description': '',
      'photos': []
    },
    'location': {
      'x': locationX,
      'y': locationY
    }
  };

  return offerObject;
};

for (var k = 0; k < offersAmount; k++) {
  offers.push(createOffer());
}

document.querySelector('.map').classList.remove('map--faded');

for (var l = 0; l < offersAmount; l++) {
  var pinInitialX = offers[l].location.x - pinWidth / 2;
  var pinInitialY = offers[l].location.y - pinHeight;
  var pin = '<button style="left: ' + String(pinInitialX) + 'px; top: ' + String(pinInitialY) + 'px;" class="map__pin"><img src="' + String(offers[l].author.avatar) + '" width="' + String(pinWidth) + '" height="' + String(pinHeight) + '" draggable="false"></button';
  mapPin.insertAdjacentHTML('beforeEnd', pin);
}

mapPin.appendChild(fragmentPin);

var renderOffers = function (offerArray) {
  var offerElement = similarOfferTemplate.cloneNode(true);
  var paragraph = offerElement.querySelectorAll('p');

  offerElement.querySelector('h3').textContent = offerArray.offer.title;
  paragraph[0].querySelector('small').textContent = offerArray.offer.address;
  paragraph[1].textContent = offerArray.offer.price + '\u20BD/ночь';
  if (offerArray.offer.type === 'flat') {
    offerElement.querySelector('h4').textContent = 'Квартира';
  } else if (offerArray.offer.type === 'bungalo') {
    offerElement.querySelector('h4').textContent = 'Бунгало';
  } else {
    offerElement.querySelector('h4').textContent = 'Дом';
  }
  paragraph[2].textContent = offerArray.offer.rooms + ' комнаты для ' + offerArray.offer.guests + ' гостей';
  paragraph[3].textContent = 'Заезд после ' + offerArray.offer.checkin + ', выезд до ' + offerArray.offer.checkout;
  offerElement.querySelector('.popup__features').innerHTML = '';

  for (var m = 0; m < offerArray.offer.features.length; m++) {
    var feature = document.createElement('li');
    feature.className = 'feature feature--' + offerArray.offer.features[m];
    offerElement.querySelector('.popup__features').appendChild(feature);
  }

  offerElement.querySelector('.popup__features + p').textContent = offerArray.offer.description;
  offerElement.querySelector('.popup__avatar').setAttribute('src', offerArray.author.avatar);

  return offerElement;
};

for (i = 0; i < offers.length; i++) {
  fragmentOffer.appendChild(renderOffers(offers[i]));
}

map.appendChild(fragmentOffer);

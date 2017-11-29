'use strict';

// Переменные
var adTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var adTypes = ['flat', 'house', 'bungalo'];
var adCheckins = ['12:00', '13:00', '14:00'];
var adCheckouts = ['12:00', '13:00', '14:00'];
var adFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var pinTemplate = getComputedStyle(document.querySelector('.map__pin img'));
var buttonTemplate = document.querySelector('template').content.querySelector('.map__pin');
var pinHeight = parseInt(pinTemplate.height, 10);
var similarOfferTemplate = document.querySelector('template').content.querySelector('article.map__card');
var map = document.querySelector('.map');
var mapPin = map.querySelector('.map__pins');
var ads = [];

// Заполнение массива объявлениями
var createAdsArray = function (adsAmount) {
  for (var k = 1; k <= adsAmount; k++) {
    ads.push(createAd(k));
  }

  return ads;
};

// Шаблон объявления
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
  var title = adTitles.splice(getRandomNumber(1, adTitles.length), 1).join();
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

// Поиск случайного целого числа в диапозоне
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

// Создание массива случаной длины
var getRandomArray = function (parentArray) {
  var arrayCopy = parentArray.slice();
  var newArray = [];
  var newArrayLength = getRandomNumber(0, arrayCopy.length);
  for (var j = 0; j < newArrayLength; j++) {
    newArray[j] = arrayCopy.splice(getRandomNumber(0, arrayCopy.length), 1).join();
  }

  return arrayCopy;
};

// Поиск случайного элемента в массиве
var getRandomArrayElement = function (array) {
  var randomElement = array[getRandomNumber(0, array.length - 1)];

  return randomElement;
};

// Создание url для аватара
var createAvatarUrl = function (adNumber) {
  var avatarNull = (adNumber < 10) ? 0 : false;
  var avatarUrl = 'img/avatars/user' + avatarNull + adNumber + '.png';

  return avatarUrl;
};

// Наполнение элементов по шаблону
var createTemplate = function (adsArray, createAdTemplate, parentElementToAppendChild) {
  var fragment = document.createDocumentFragment();
  var createAdTemplateElement;

  for (var l = 0, lengthOfArray = adsArray.length; l < lengthOfArray; l++) {
    createAdTemplateElement = createAdTemplate(adsArray[l]);
    fragment.appendChild(createAdTemplateElement);
  }
  parentElementToAppendChild.appendChild(fragment);
};

// Создание пина
var createAdsMarker = function (adObject) {
  var adsPin = buttonTemplate.cloneNode(true);
  var pinInitialX = adObject.location.x;
  var pinInitialY = adObject.location.y - pinHeight;
  adsPin.setAttribute('style', 'left: ' + pinInitialX + 'px; top: ' + pinInitialY + 'px;');
  adsPin.querySelector('img').src = adObject.author.avatar;

  return adsPin;
};

// Создание карточки объявления
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

document.querySelector('.map').classList.remove('map--faded');
createAdsArray(8);
createTemplate(ads, createAdsMarker, mapPin);
createTemplate(ads, renderAds, map);

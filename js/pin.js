'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPin = map.querySelector('.map__pins');
  var mainMapPin = map.querySelector('.map__pin--main');

  var createTemplate = function (adsArray, createAdTemplate, parentElementToAppendChild) {
    var fragment = document.createDocumentFragment();
    var createAdTemplateElement;

    for (var i = 0, lengthOfArray = adsArray.length; i < lengthOfArray; i++) {
      createAdTemplateElement = createAdTemplate(adsArray[i]);
      fragment.appendChild(createAdTemplateElement);
    }
    parentElementToAppendChild.appendChild(fragment);
  };

  var createAdsMarker = function (adObject) {
    var buttonTemplate = document.querySelector('template').content.querySelector('.map__pin');
    var adsPin = buttonTemplate.cloneNode(true);
    var pinTemplate = getComputedStyle(document.querySelector('.map__pin img'));
    var pinHeight = parseInt(pinTemplate.height, 10);
    var mainMapPinPseudo = getComputedStyle(mainMapPin, ':after');
    var mainMapPinPseudoHeight = parseInt(mainMapPinPseudo.borderTopWidth, 10);
    var pinInitialX = adObject.location.x;
    var pinInitialY = adObject.location.y - pinHeight - mainMapPinPseudoHeight;
    adsPin.setAttribute('style', 'left: ' + pinInitialX + 'px; top: ' + pinInitialY + 'px;');
    adsPin.querySelector('img').src = adObject.author.avatar;
    return adsPin;
  };

  window.pin = {
    renderMapPins: function () {
      createTemplate(window.data.ads, createAdsMarker, mapPin);
    }
  };

  mainMapPin.addEventListener('mouseup', function () {
    window.map.activateMap();
  });

  mapPin.addEventListener('click', function (evt) {
    window.map.openPopup(evt);
  });
})();

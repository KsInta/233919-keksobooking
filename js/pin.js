'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPin = map.querySelector('.map__pins');
  var mainMapPin = map.querySelector('.map__pin--main');
  var pinTemplate = getComputedStyle(document.querySelector('.map__pin img'));
  var pinHeight = parseInt(pinTemplate.height, 10);
  var mainMapPinPseudo = getComputedStyle(mainMapPin, ':after');
  var mainMapPinPseudoHeight = parseInt(mainMapPinPseudo.borderTopWidth, 10);
  var mainForm = document.querySelector('.notice__form');
  var addressInput = mainForm.querySelector('#address');

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
    var pinInitialX = adObject.location.x;
    var pinInitialY = adObject.location.y - pinHeight - mainMapPinPseudoHeight;
    adsPin.setAttribute('style', 'left: ' + pinInitialX + 'px; top: ' + pinInitialY + 'px;');
    adsPin.querySelector('img').src = adObject.author.avatar;
    return adsPin;
  };

  window.pin = {
    renderMapPins: function () {
      createTemplate(window.data.ads, createAdsMarker, mapPin);
    },

    toggleFormFieldsetsAbility: function (fields, disabled) {
      for (var i = 0; i < fields.length; i++) {
        fields[i].disabled = (disabled) ? true : false;
      }
    }
  };

  mainMapPin.addEventListener('mouseup', function () {
    window.map.activateMap();
  });

  mapPin.addEventListener('click', function (evt) {
    window.map.openPopup(evt);
  });

  mainMapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var shift = {
      x: evt.clientX - mainMapPin.offsetLeft,
      y: evt.clientY - (pinHeight / 2 + mainMapPinPseudoHeight) - mainMapPin.offsetTop
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var coordinate = {
        x: moveEvt.clientX - shift.x,
        y: moveEvt.clientY - (pinHeight / 2 + mainMapPinPseudoHeight) - shift.y
      };

      mainMapPin.style.left = coordinate.x + 'px';
      mainMapPin.style.top = coordinate.y + 'px';

      if (coordinate.y < 100) {
        mainMapPin.style.top = '100px';
      } else if (coordinate.y > 500) {
        mainMapPin.style.top = '500px';
      }

      addressInput.value = 'x: ' + mainMapPin.style.left + ', y: ' + mainMapPin.style.top;
    };

    var onMouseMoveUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseMoveUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseMoveUp);
  });
})();

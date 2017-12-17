'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPin = map.querySelector('.map__pins');
  var mainMapPin = map.querySelector('.map__pin--main');
  var pinTemplate = getComputedStyle(document.querySelector('.map__pin img'));
  var pinHeight = parseInt(pinTemplate.height, 10);
  var mainMapPinPseudo = getComputedStyle(mainMapPin, ':after');
  var mainMapPinPseudoHeight = parseInt(mainMapPinPseudo.borderTopWidth, 10);
  var popup = map.querySelector('.map__card');
  var mainForm = document.querySelector('.notice__form');
  var formFieldsets = mainForm.querySelectorAll('.form__element');
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

  var activateMap = function () {
    map.classList.remove('map--faded');
    mainForm.classList.remove('notice__form--disabled');
    for (var i = 0; i < mapPins.length; i++) {
      mapPins[i].hidden = false;
    }
    window.form.toggleFormFieldsetsAbility(formFieldsets, false);
  };

  var openPopup = function (evt) {
    var target = evt.target;

    while (target !== mapPin) {
      if (target.className === 'map__pin') {
        for (var i = 0; i < mapPins.length; i++) {
          mapPins[i].classList.remove('map__pin--active');
        }
        target.classList.add('map__pin--active');

        popup.classList.remove('hidden');

        window.card.changePopup(target);

        document.addEventListener('keydown', window.map.closePopupEsc);

        break;
      }

      target = target.parentNode;
    }
  };

  var renderMapPins = function () {
    createTemplate(window.data.ads, createAdsMarker, mapPin);
  };

  renderMapPins();

  var mapPins = mapPin.querySelectorAll('.map__pin:not(.map__pin--main)');

  mainMapPin.addEventListener('mouseup', function () {
    activateMap();
  });

  mapPin.addEventListener('click', function (evt) {
    openPopup(evt);
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

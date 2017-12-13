'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var map = document.querySelector('.map');
  var mapPin = map.querySelector('.map__pins');
  var mainForm = document.querySelector('.notice__form');
  var formFieldsets = mainForm.querySelectorAll('.form__element');

  window.pin.renderMapPins();

  var popup = map.querySelector('.map__card');
  var popupClose = popup.querySelector('.popup__close');
  var mapPins = mapPin.querySelectorAll('.map__pin:not(.map__pin--main)');

  var hideElements = function () {
    for (var i = 0; i < mapPins.length; i++) {
      mapPins[i].hidden = true;
    }
  };

  hideElements();

  var closePopup = function () {
    popup.classList.add('hidden');
    for (var i = 0; i < mapPins.length; i++) {
      mapPins[i].classList.remove('map__pin--active');
    }
  };

  var closePopupEsc = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup(evt);
    }
  };

  popupClose.addEventListener('click', function (evt) {
    closePopup(evt);
  });

  window.map = {
    activateMap: function () {
      map.classList.remove('map--faded');
      mainForm.classList.remove('notice__form--disabled');
      for (var i = 0; i < mapPins.length; i++) {
        mapPins[i].hidden = false;
      }
      window.pin.toggleFormFieldsetsAbility(formFieldsets, false);
    },

    openPopup: function (evt) {
      var target = evt.target;

      while (target !== mapPin) {
        if (target.className === 'map__pin') {
          for (var i = 0; i < mapPins.length; i++) {
            mapPins[i].classList.remove('map__pin--active');
          }
          target.classList.add('map__pin--active');

          popup.classList.remove('hidden');

          window.card.changePopup(target);

          document.addEventListener('keydown', closePopupEsc);

          break;
        }

        target = target.parentNode;
      }
    },
  };
})();

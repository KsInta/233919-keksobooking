'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var map = document.querySelector('.map');
  var mapPin = map.querySelector('.map__pins');

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

  popupClose.addEventListener('click', function (evt) {
    closePopup(evt);
  });

  window.map = {
    closePopupEsc: function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closePopup(evt);
      }
    }
  };
})();

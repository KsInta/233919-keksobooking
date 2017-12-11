'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var map = document.querySelector('.map');
  var mapPin = map.querySelector('.map__pins');
  var mainForm = document.querySelector('.notice__form');
  var formFieldsets = mainForm.querySelectorAll('.form__element');

  var createMapElements = function (arrObjects) {
    var fragment = document.createDocumentFragment();

    window.pin.renderMapPins();

    fragment.appendChild(window.card.renderMapCard(arrObjects));

    mapPin.appendChild(fragment);
  };

  createMapElements(window.data.ads[0]);

  var popup = map.querySelector('.map__card');
  var popupClose = popup.querySelector('.popup__close');
  map.insertBefore(popup, map.children[1]);
  var mapPins = mapPin.querySelectorAll('.map__pin:not(.map__pin--main)');
  popup.classList.add('hidden');

  var hideElements = function () {
    for (var i = 0; i < mapPins.length; i++) {
      mapPins[i].hidden = true;
    }
  };

  hideElements();

  var changePopup = function (target) {
    for (var i = 0; i < window.data.ads.length; i++) {
      if (target.firstChild.getAttribute('src') === window.data.ads[i].author.avatar) {
        window.card.renderAds(popup, window.data.ads[i]);
      }
    }
  };

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
      window.form.chooseFieldsState(formFieldsets, false);
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

          changePopup(target);

          document.addEventListener('keydown', closePopupEsc);

          break;
        }

        target = target.parentNode;
      }
    },
  };
})();

'use strict';

(function () {
  var mainForm = document.querySelector('.notice__form');
  var addressInput = mainForm.querySelector('#address');
  var titleInput = mainForm.querySelector('#title');
  var priceInput = mainForm.querySelector('#price');
  var timeInSelect = mainForm.querySelector('#timein');
  var timeOutSelect = mainForm.querySelector('#timeout');
  var typeSelect = mainForm.querySelector('#type');
  var typeOptions = typeSelect.querySelectorAll('option');
  var roomAmountSelect = mainForm.querySelector('#room_number');
  var roomAmountOptions = roomAmountSelect.querySelectorAll('option');
  var capacitySelect = mainForm.querySelector('#capacity');
  var capacityOptions = capacitySelect.querySelectorAll('option');

  window.form = {
    chooseFieldsState: function (fields, disabled) {
      for (var i = 0; i < fields.length; i++) {
        fields[i].disabled = (disabled) ? true : false;
      }
    }
  };

  var checkValidationAddressInput = function () {
    addressInput.setAttribute('readonly', '');
    addressInput.required = true;
  };

  var checkValidationTitleInput = function () {
    titleInput.setAttribute('minlength', '30');
    titleInput.setAttribute('maxlength', '100');
    titleInput.required = true;
  };

  var checkValidationInputPrice = function () {
    priceInput.setAttribute('value', '1000');
    priceInput.setAttribute('min', '0');
    priceInput.setAttribute('max', '1000000');
    priceInput.required = true;
  };

  var onTimeInSelectChange = function () {
    timeOutSelect.selectedIndex = timeInSelect.selectedIndex;
  };

  var onTimeOutSelectChange = function () {
    timeInSelect.selectedIndex = timeOutSelect.selectedIndex;
  };

  var onSetMinValueChange = function () {
    for (var i = 0; i < typeOptions.length; i++) {
      if (typeOptions[i].selected === true) {
        switch (typeOptions[i].value) {
          case 'bungalo':
            priceInput.min = 0;
            break;
          case 'flat':
            priceInput.min = 1000;
            break;
          case 'house':
            priceInput.min = 5000;
            break;
          case 'palace':
            priceInput.min = 10000;
            break;
        }
      }
    }
  };

  var onSetCapacityChange = function () {
    for (var i = 0; i < capacityOptions.length; i++) {
      capacityOptions[i].disabled = false;
    }

    for (var j = 0; j < roomAmountOptions.length; j++) {

      if (roomAmountOptions[j].selected === true) {
        switch (roomAmountOptions[j].value) {
          case '1':
            capacityOptions[2].selected = true;
            break;
          case '2':
            capacityOptions[1].selected = true;
            break;
          case '3':
            capacityOptions[0].selected = true;
            break;
          case '100':
            capacityOptions[3].selected = true;
            break;
        }
      }
    }
  };

  checkValidationAddressInput();
  checkValidationTitleInput();
  checkValidationInputPrice();
  timeInSelect.addEventListener('change', onTimeInSelectChange);
  timeOutSelect.addEventListener('change', onTimeOutSelectChange);
  typeSelect.addEventListener('change', onSetMinValueChange);
  roomAmountSelect.addEventListener('change', onSetCapacityChange);

  mainForm.setAttribute('action', 'https://js.dump.academy/keksobooking');
})();

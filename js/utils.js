'use strict';

(function () {
  window.randomValue = {
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max + 1 - min)) + min;
    },

    getRandomArray: function (parentArray) {
      var arrayCopy = parentArray.slice();
      var newArray = [];
      var newArrayLength = window.randomValue.getRandomNumber(0, arrayCopy.length);
      for (var j = 0; j < newArrayLength; j++) {
        newArray[j] = arrayCopy.splice(window.randomValue.getRandomNumber(0, arrayCopy.length), 1).join();
      }

      return arrayCopy;
    },

    getRandomArrayElement: function (array) {
      var randomElement = array[window.randomValue.getRandomNumber(0, array.length - 1)];

      return randomElement;
    }
  };
})();

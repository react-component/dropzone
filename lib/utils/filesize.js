'use strict';

module.exports = function(size) {
  var units = ['TB', 'GB', 'MB', 'KB', 'b'];
  var filesizeBase = 1024;
  var selectedSize, selectedUnit;
  for (var i = 0, len = units.length; i < len; i++) {
    var unit = units[i];
    var cutoff = Math.pow(filesizeBase, 4 - i) / 10;
    if (size >= cutoff) {
      selectedSize = size / Math.pow(filesizeBase, 4 - i);
      selectedUnit = unit;
      break;
    }
  }
  selectedSize = Math.round(10 * selectedSize) / 10;
  return [selectedSize, selectedUnit];
};

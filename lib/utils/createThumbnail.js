'use strict';

module.exports =  function(file) {
  var fileReader = new FileReader;
  return new Promise(function(resolve, reject) {
    fileReader.onload = function() {
      if (file.type === "image/svg+xml") {
        return resolve();
      }

      var img = document.createElement("img");
      img.onload = function() {
        file.width = img.width;
        file.height = img.height;
        resolve(img.src);
      };

      img.onerror = reject;
      img.src = fileReader.result;
    };

    fileReader.readAsDataURL(file);
  });
};

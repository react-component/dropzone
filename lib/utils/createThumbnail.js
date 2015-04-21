'use strict';

module.exports =  function(file) {
  var fileReader = new FileReader();
  if (file.type.indexOf('image/') === -1) {
    return Promise.resolve(null);
  }

  return new Promise(function(resolve, reject) {
    fileReader.onload = function() {
      if (file.type === "image/svg+xml") {
        return resolve();
      }

      var img = document.createElement("img");
      img.onload = function() {
        file.width = img.width;
        file.height = img.height;
        var size = countCanvasSize(file, {
          width: 200,
          height: 200
        });

        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = size[0];
        canvas.height = size[1];
        ctx.drawImage(img, 0, 0, file.width, file.height, 0, 0, size[0], size[1]);
        var thumbnail = canvas.toDataURL("image/png");
        resolve(thumbnail);
      };

      img.onerror = reject;
      img.src = fileReader.result;
    };

    fileReader.readAsDataURL(file);
  });
};

// 计算canvas宽高
function countCanvasSize(file, canvas) {
  var size = [canvas.width, canvas.height];
  var h = file.height, w = file.width;
  if (size[0] < w) {
    return [size[0], h * (size[0] / w)];
  }

  return [w, h];
}

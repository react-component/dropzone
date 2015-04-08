// fake dom, use to fake input which choose an img file
'use strict';

var isLowWebkit = false;
if (!window.Promise) {
  isLowWebkit = true;
  require('./Blob');
  var Promise = require('./promise');
  window.Promise = Promise;
}

var fakeDom = {
  files: [],
  value: 'world.html'
};

fakeDom.files.item = function(i) {
  return fakeDom.files[i];
};

var img = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEX///9ISEhr7AOpAAAAAXRSTlMAQObYZgAAACRJREFUCB1jQAYcAgwyFgx2NQzyPxj4PzCwP2BgPsDA2MCABAB3igVoBVbiiwAAAABJRU5ErkJggg==';

function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

var type = 'image/png';
var imgFile;
if (isLowWebkit) {
  imgFile = {
    type: 'text/string',
    name: 'a.js',
    size: 12323
  };
} else {
  imgFile = new File([b64toBlob(img, type)], 'a.png', {type: type});
}

fakeDom.files[0] = imgFile;

module.exports = fakeDom;

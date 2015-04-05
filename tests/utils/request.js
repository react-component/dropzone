// mock request
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var request = assign({}, EventEmitter.prototype, {
  init: function() {
    this.attachs = {};
    this.fields = {};
  },
  attach: function(key, val) {
    this.attachs[key] = val;
    return this;
  },
  field: function(key, val) {
    this.fields[key] = val;
    return this;
  }
});
var percent = 0;
exports.post = function(ret) {
  percent = 0;
  request.init();
  return function() {
    request.end = function(callback) {
      progress(callback, null, ret);
    };

    return request;
  };
};

exports.request = request;

function progress(callback, err, ret) {
  setTimeout(function() {
    percent += 20;
    request.emit('progress', {percent: percent});
    if (percent <= 100) {
      progress(callback, err, ret);
    } else {
      callback(err, ret);
    }
  }, 10);
}

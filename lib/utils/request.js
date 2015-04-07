'use strict';

var request = require('superagent');
exports.upload = function(file, config) {
  var req = request
  .post(config.action)
  .attach(config.paramName, file, file.name);
  for (var key in config.data) {
    req.field(key, config.data[key]);
  }
  return req;
};

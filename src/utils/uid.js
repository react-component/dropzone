'use strict';
function uid(len) {
  len = len || 7;
  return Math.random().toString(35).substr(2, len);
}
module.exports = uid;

/**!
 * desc
 * Copyright(c) Alibaba Group Holding Limited.
 * MIT Licensed
 *
 * Authors:
 *   翰文 <hanwen.sah@taobao.com> (http://shepherdwind.com)
 */
'use strict';

var DzDispatcher = require('../dispatcher/DzDispatcher');
var DzConstants = require('../constants/DzConstants');
var StatusConstants = require('../constants/StatusConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var uid = require('../utils/uid');

var CHANGE_EVENT = 'change';
var _files = {};

var FileStore = assign({}, EventEmitter.prototype, {

  getAllFilesByUid: function(uid) {
    return _files[uid] || {};
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  }

});

function add(file, dropzoneId) {
  var _uid = uid();
  file.uid = _uid;
  file.status = StatusConstants.ADD;
  file.dropzoneId = dropzoneId;
  _files[dropzoneId] = _files[dropzoneId] || {};
  _files[dropzoneId][_uid] = file;
}

function reject(file, msg, dropzoneId) {
  add(file, dropzoneId);
  file.status = StatusConstants.REJECTED;
  file.done = msg;
}

function success(uid, dropzoneId) {
  _files[dropzoneId][uid].done = true;
}

function uploading(uid, percent, dropzoneId) {
  _files[dropzoneId][uid].status = StatusConstants.UPLOADING;
  _files[dropzoneId][uid].percent = percent;
}

function fail(uid, msg, dropzoneId) {
  _files[dropzoneId][uid].done = msg;
}

function remove(uid, dropzoneId) {
  delete _files[dropzoneId][uid];
}

DzDispatcher.register(function(action) {
  switch (action.actionType) {
    case DzConstants.FILE_ADD:
      add(action.file, action.dropzoneId);
      break;

    case DzConstants.FILE_REJECTED:
      reject(action.file, action.msg, action.dropzoneId);
      break;

    case DzConstants.FILE_UPLOAD_PROGRESS:
      uploading(action.uid, action.percent, action.dropzoneId);
      break;

    case DzConstants.FILE_UPLOAD_SUCCESS:
      success(action.uid, action.dropzoneId);
      break;

    case DzConstants.FILE_UPLOAD_FAIL:
      fail(action.uid, action.error, action.dropzoneId);
      break;

    case DzConstants.FILE_REMOVE:
      remove(action.uid, action.dropzoneId);
      break;

    default:
  }

  FileStore.emitChange();
});

module.exports = FileStore;

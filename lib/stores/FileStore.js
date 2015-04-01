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

  getAllFiles: function() {
    return _files;
  },

  getAddedFiles: function() {
    return Object.keys(_files).filter(function(uid) {
      var file = _files[uid];
      if (file.status === StatusConstants.ADD) {
        return file;
      }
    });
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

function add(file) {
  var _uid = uid();
  file.uid = _uid;
  file.status = StatusConstants.ADD;
  _files[_uid] = file;
}

function reject(file, msg) {
  add(file);
  file.status = StatusConstants.REJECTED;
  file.done = msg;
}

function success(uid) {
  _files[uid].done = true;
}

function uploading(uid, percent) {
  _files[uid].status = StatusConstants.UPLOADING;
  _files[uid].percent = percent;
}

function fail(uid, msg) {
  _files[uid].done = msg;
}

function remove(uid) {
  delete _files[uid];
}

DzDispatcher.register(function(action) {
  switch (action.actionType) {
    case DzConstants.FILE_ADD:
      add(action.file);
      break;

    case DzConstants.FILE_REJECTED:
      reject(action.file, action.msg);
      break;

    case DzConstants.FILE_UPLOAD_PROGRESS:
      uploading(action.uid, action.percent);
      break;

    case DzConstants.FILE_UPLOAD_SUCCESS:
      success(action.uid);
      break;

    case DzConstants.FILE_UPLOAD_FAIL:
      fail(action.uid, action.error);
      break;

    case DzConstants.FILE_REMOVE:
      remove(action.uid);
      break;

    default:
  }

  FileStore.emitChange();
});

module.exports = FileStore;

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
var createThumbnail = require('../utils/createThumbnail');
var request = require('../utils/request');

var FileActions = {

  upload: function(file, accept, config) {

    createThumbnail(file)
    .then(function(thumbnail) {
      file.thumbnail = thumbnail;
      return file;
    })
    .then(accept)
    .then(function() {
      DzDispatcher.dispatch({
        actionType: DzConstants.FILE_ADD,
        file: file
      });

      upload(file, config);
    })
    .catch(function(msg) {
      DzDispatcher.dispatch({
        actionType: DzConstants.FILE_REJECTED,
        file: file,
        msg: msg
      });
      config.error(msg, file);
    });
  },

  remove: function(uid) {
    DzDispatcher.dispatch({
      actionType: DzConstants.FILE_REMOVE,
      uid: uid
    });
  }

};

function upload(file, config) {
  request
  .upload(file, config)
  .on('progress', function(e) {
    DzDispatcher.dispatch({
      actionType: DzConstants.FILE_UPLOAD_PROGRESS,
      uid: file.uid,
      percent: e.percent
    });
  })
  .end(function(err, ret) {
    if (err || ret.status !== 200) {
      var message = err ? err.message : ret.text;
      DzDispatcher.dispatch({
        actionType: DzConstants.FILE_UPLOAD_FAIL,
        uid: file.uid,
        error: message
      });

      config.error(message, file);
      return;
    }

    DzDispatcher.dispatch({
      actionType: DzConstants.FILE_UPLOAD_SUCCESS,
      uid: file.uid,
      body: ret.body
    });

    config.success(ret.body, file);
  });
}
module.exports = FileActions;

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

  upload: function(file, accept, config, dropzoneId) {

    createThumbnail(file)
    .then(function(thumbnail) {
      file.thumbnail = thumbnail;
      DzDispatcher.dispatch({
        actionType: DzConstants.FILE_THUMBNAIL,
        dropzoneId: dropzoneId,
        file: file
      });
    });

    accept(file)
    .then(function() {
      DzDispatcher.dispatch({
        actionType: DzConstants.FILE_ADD,
        dropzoneId: dropzoneId,
        file: file
      });

      upload(file, config, dropzoneId);
    })
    .catch(function(msg) {
      DzDispatcher.dispatch({
        actionType: DzConstants.FILE_REJECTED,
        dropzoneId: dropzoneId,
        file: file,
        msg: msg
      });
      config.error(msg, file);
    });
  },

  remove: function(uid, dropzoneId) {
    DzDispatcher.dispatch({
      actionType: DzConstants.FILE_REMOVE,
      dropzoneId: dropzoneId,
      uid: uid
    });
  }

};

function upload(file, config, dropzoneId) {
  request
  .upload(file, config)
  // TODO: 这里progress事件会多次触发，需要考虑如何处理下
  .on('progress', function(e) {
    DzDispatcher.dispatch({
      actionType: DzConstants.FILE_UPLOAD_PROGRESS,
      dropzoneId: dropzoneId,
      uid: file.uid,
      percent: e.percent
    });
  })
  .end(function(err, ret) {
    if (err || ret.status !== 200) {
      var message = err ? err.message : ret.text;
      DzDispatcher.dispatch({
        actionType: DzConstants.FILE_UPLOAD_FAIL,
        dropzoneId: dropzoneId,
        uid: file.uid,
        error: message
      });

      config.error(message, file);
      return;
    }

    DzDispatcher.dispatch({
      actionType: DzConstants.FILE_UPLOAD_SUCCESS,
      dropzoneId: dropzoneId,
      uid: file.uid,
      body: ret.body
    });

    config.success(ret.body, file);
  });
}
module.exports = FileActions;

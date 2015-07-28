'use strict';

/**
* Dropzone
*/
var React = require('react');
var DzPreview = require('./DzPreview');
var Upload = require('rc-upload');

var Dropzone = React.createClass({

  getDefaultProps: function() {
    return {
      className: 'rc-dropzone',
      paramName: 'file',
      accept: function(file) {
        return Promise.resolve(file);
      },
      inputAccept: '',
      // 附件参数
      data: {},
      // 成功回调
      success: function() {},
      // 失败回调
      error: function() {}
    };
  },

  remove: function(file) {
    console.log(file);
  },

  getInitialState: function() {
    return {
      files: {}
    };
  },

  startUpladFile(file) {
    var files = this.state.files;
    files[file.uid] = file;
    this.setState({files: files});
  },

  uploadSucces(ret, file) {
    var files = this.state.files;
    files[file.uid].done = true;
    console.log(ret);
    this.setState({files: files});
  },

  progress(e, file) {
    var files = this.state.files;
    files[file.uid].percent = e.percent;
    this.setState({files: files});
  },

  uploadError(e) {
    console.log(e);
  },

  previews: function() {
    var files = this.state.files;
    return Object.keys(files).map(function(uid) {
      return <DzPreview file={files[uid]} key={uid} />;
    });
  },

  render: function() {
    var {className, paramName, inputAccept, children, action } = this.props;
    var previews = this.previews();
    var fileNumber = Object.keys(this.state.files).length;
    return (
      <Upload name={paramName} accept={inputAccept}
        onStart={this.startUpladFile}
        onSuccess={this.uploadSucces}
        onProgress={this.progress}
        onError={this.uploadError}
        action={action}
      >
        <div className={className}>
          {previews}
          { !fileNumber ? children : '' }
        </div>
      </Upload>
    );
  }
});

module.exports = Dropzone;

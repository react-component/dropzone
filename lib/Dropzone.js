/** @jsx React.DOM */
'use strict';

/**
* Dropzone
*/
var React = require('react');
var FileStore = require('./stores/FileStore');
var FileInput = require('./FileInput');
var DzPreview = require('./DzPreview');
var FileActions = require('./actions/FileActions');
var uid = require('./utils/uid');

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

  addChangeListener: function(callback) {
    FileStore.addChangeListener(this.uid, callback);
  },

  removeChangeListener: function(callback) {
    FileStore.removeChangeListener(this.uid, callback);
  },

  remove: function(file) {
    FileActions.remove(file.uid, file.dropzoneId);
  },

  getInitialState: function() {
    this.uid = uid();
    return {
      files: {}
    };
  },

  componentDidMount: function() {
    FileStore.addChangeListener(this.uid, this._onChange);
  },

  componentWillUnmount: function() {
    FileStore.removeChangeListener(this.uid, this._onChange);
    FileStore.removeAll(this.uid);
  },

  clickFileInput: function() {
    var input = this.refs.input;
    input.getDOMNode().click();
  },

  previews: function() {
    var files = this.state.files;
    return Object.keys(files).map(function(uid) {
      return <DzPreview file={files[uid]} key={uid} />;
    });
  },

  addFile: function(file) {
    FileActions.upload(file, this.props.accept, {
      action: this.props.action,
      paramName: this.props.paramName,
      success: this.props.success,
      error: this.props.error,
      data: this.props.data
    }, this.uid);
  },

  _addFiles: function(files) {
    var len = files.length;
    if (len > 0) {
      for (var i = 0; i < len; i++) {
        var file = files.item(i);
        this.addFile(file);
      }
    }
  },

  _onChange: function() {
    var files = FileStore.getAllFilesByUid(this.uid);
    this.setState({files: files});
  },

  _onFileDrop: function(e) {
    if (e.type === 'dragover') {
      return e.preventDefault();
    }
    var files = e.dataTransfer.files;
    this._addFiles(files);

    e.preventDefault();
  },

  render: function() {
    var props = this.props;
    var previews = this.previews();
    var fileNumber = Object.keys(this.state.files).length;
    return (
      <form className={props.className}
        onDrop={this._onFileDrop}
        onDragOver={this._onFileDrop}
        onClick={this.clickFileInput}>
        <FileInput name={props.paramName}
          accept={this.props.inputAccept}
          ref="input" upload={this._addFiles} />
        {previews}
        { !fileNumber ? props.children : '' }
      </form>
    );
  }
});

module.exports = Dropzone;

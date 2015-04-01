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

var Dropzone = React.createClass({

  getDefaultProps: function() {
    return {
      className: 'dropzone',
      paramName: 'file',
      accept: function(file) {
        return Promise.resolve(file);
      },
      // 附件参数
      data: {},
      // 成功回调
      success: function() {},
      // 失败回调
      error: function() {}
    };
  },

  remove: function(file) {
    FileActions.remove(file.uid);
  },

  getInitialState: function() {
    return {
      files: FileStore.getAllFiles()
    };
  },

  componentDidMount: function() {
    FileStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    FileStore.removeChangeListener(this._onChange);
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
    });
  },

  _onChange: function() {
    var files = FileStore.getAllFiles();
    this.setState({files: files});
  },

  render: function() {
    var props = this.props;
    var previews = this.previews();
    var fileNumber = Object.keys(this.state.files).length;
    return (
      <form className={props.className} onClick={this.clickFileInput}>
        <FileInput name={props.paramName} ref="input" upload={this.addFile} />
        {previews}
        { !fileNumber ? props.children : '' }
      </form>
    );
  }
});

module.exports = Dropzone;

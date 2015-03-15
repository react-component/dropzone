/** @jsx React.DOM */
'use strict';

/**
* Dropzone
*/
var React = require('react');
var FileInput = require('./FileInput');
var DzPreview = require('./DzPreview');
var post = require('./utils/request').post;
var uid = require('./utils/uid');
var createThumbnail = require('./utils/createThumbnail');

var Dropzone = React.createClass({

  getDefaultProps: function() {
    return {
      className: 'dropzone',
      paramName: 'file',
      accept: function(file) {
        return Promise.resolve(file);
      }
    };
  },

  accept: function(file) {
    return createThumbnail(file).then(function(thumbnail) {
      file.thumbnail = thumbnail;
      return file;
    })
    .then(this.props.accept)
    .then(function() {
      return file;
    });
  },

  getInitialState: function() {
    return {
      files: []
    };
  },

  clickFileInput: function() {
    var input = this.refs.input;
    input.getDOMNode().click();
  },

  previews: function() {
    var files = this.state.files;
    return files.map(function(file) {
      return <DzPreview file={file} key={file.uid}/>;
    });
  },

  addFile: function(file) {
    var self = this;
    var files = this.state.files;
    file.uid = uid(8);
    files.push(file);
    this.accept(file)
      .then(this.startUploadFile)
      .catch(function fileRejected(msg) {
        file.done = msg;
        self.updateFilesState();
      });
  },

  startUploadFile: function(file) {
    if (!file) {
      return;
    }

    var props = this.props;
    var self = this;
    post(props.action)
      .attach(props.paramName, file, file.type)
      .on('progress', function(e) {
        file.percent = e.percent;
        self.updateFilesState();
      })
      .end(function() {
        file.done = true;
        self.updateFilesState();
      });
  },

  updateFilesState: function(files) {
    files = files || this.state.files;
    this.setState({ files: files });
  },

  render: function() {
    var props = this.props;
    var previews = this.previews();
    var fileNumber = this.state.files.length;
    return (
      <form className={props.className} onClick={this.clickFileInput}>
        <FileInput name={props.paramName} ref="input" addFile={this.addFile} />
        {previews}
        { !fileNumber ? props.children: '' }
      </form>
    );
  }
});

module.exports = Dropzone;

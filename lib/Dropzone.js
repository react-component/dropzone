/** @jsx React.DOM */
'use strict';

/**
* Dropzone
*/
var React = require('react');
var FileInput = require('./FileInput');
var DzPreview = require('./DzPreview');
var post = require('./utils/request').post;

var Dropzone = React.createClass({

  getDefaultProps: function() {
    return {
      className: 'dropzone',
      paramName: 'file'
    };
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
      return <DzPreview file={file} key={file.name}/>;
    });
  },

  addFile: function(file) {
    var files = this.state.files;
    var len = files.length;
    files.push(file);
    this.startUploadFile(file);
    this.updateFilesState();
  },

  startUploadFile: function(file) {
    var props = this.props;
    var self = this;
    post(props.action)
      .attach(props.paramName, file, file.type)
      .on('progress', function(e) {
        file.percent = e.percent;
        self.updateFilesState();
      })
      .end(function(res) {
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
    var position = this.state.position;
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

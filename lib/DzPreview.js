/** @jsx React.DOM */
'use strict';

var React = require('react');
var filesize = require('./utils/filesize');
var DzPreview = React.createClass({

  getDefaultProps: function() {
    return {
      file: {}
    };
  },

  getInitialState: function() {
    return {
      thumbnail: null
    };
  },

  onClick: function(e) {
    e.preventDefault();
    e.stopPropagation();
  },

  getProgress: function() {
    var file = this.props.file;
    if (file.done) {
      return '';
    }

    var css = { width: file.percent + '%' };
    return <div className="dz-progress">
      <span className="dz-upload" style={css}></span>
    </div>;
  },

  getClassName: function(file) {
    if (file.done === true) {
      return 'dz-preview dz-image-preivew dz-success dz-complete';
    }

    if (typeof file.done === 'string') {
      return 'dz-preview dz-image-preivew dz-error dz-complete';
    }

    return 'dz-preview dz-processing dz-image-preview';
  },

  fileResult: function(file) {
    if (file.done === true) {
      return <div className="dz-success-mark"><span>✔</span></div>;
    }

    if (typeof file.done === 'string') {
      return <div><div className="dz-error-mark"><span>✘</span></div>
      <div className="dz-error-message"><span>{file.done}</span></div></div>;
    }
  },

  render: function() {
    var file = this.props.file;
    var size = filesize(file.size);
    var progress = this.getProgress();
    var imageStyle = {};

    if (file.thumbnail) {
      imageStyle.backgroundImage = 'url(' + file.thumbnail + ')';
    }

    var classname = this.getClassName(file);
    var fileResult = this.fileResult(file);

    return (
      <div className={classname} onClick={this.onClick}>
        <div className="dz-details">
          <div className="dz-size">
            <span><strong>{size.join(' ')}</strong></span>
          </div>
          <div className="dz-filename"><span>{file.name}</span></div>
        </div>
        <div className="dz-image">
          <span className="dz-img" style={imageStyle}></span>
        </div>
        {progress}
        {fileResult}
      </div>
    );
  }
});

module.exports = DzPreview;

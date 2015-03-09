/** @jsx React.DOM */
'use strict';

var React = require('react');
var filesize = require('./utils/filesize');
var createThumbnail = require('./utils/createThumbnail');
var DzPreview = React.createClass({

  getDefaultProps: function() {
    return {
      file: {}
    };
  },

  componentDidMount: function() {
    var file = this.props.file;
    var self = this;
    createThumbnail(file).then(function(thumbnail) {
      self.setState({ thumbnail: thumbnail });
    });
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

  render: function() {
    var file = this.props.file;
    var size = filesize(file.size);
    var progress = this.getProgress();
    var state = this.state;
    return (
      <div className="dz-preview dz-file-preview" onClick={this.onClick}>
        <div className="dz-details">
          <div className="dz-filename">{file.name}</div>
          <div className="dz-size">
            <strong>{size[0]}</strong>{size[1]}
          </div>
          <img src={state.thumbnail} width="100"/>
        </div>
        {progress}
        <div className="dz-success-mark"><span>✔</span></div>
        <div className="dz-error-mark"><span>✘</span></div>
        <div className="dz-error-message"><span></span></div>
      </div>
    );
  }
});

module.exports = DzPreview;

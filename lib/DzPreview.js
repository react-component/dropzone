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

    var percent = file.percent || 0;
    var css = {width: percent + '%'};
    if (typeof file.done === 'string') {
      return <span className="dz-error-message">{file.done}</span>;
    }

    return [
    <span className="dz-progress" key="1">
      <span className="dz-upload" style={css}></span>
    </span>,
    <span className="dz-percent" key="2">{css.width}</span>
    ];
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

  _getExt: function(file) {
    if (file.type) {
      return file.type.split('/')[1];
    }
    var names = file.name.split('.');
    return names[names.length - 1];
  },

  render: function() {
    var file = this.props.file;
    var size = filesize(file.size);
    var progress = this.getProgress();
    var imageStyle = {};

    var imgCls = 'dz-img';
    if (file.thumbnail) {
      imageStyle.backgroundImage = 'url(' + file.thumbnail + ')';
    } else {
      imgCls += ' dz-file-type';
    }

    var classname = this.getClassName(file);
    var ext = this._getExt(file);

    return (
      <div className={classname} onClick={this.onClick}>

        <div className="dz-image">
          <span className={imgCls} style={imageStyle}>{ext}</span>
        </div>

        <div className="dz-details">
          <div className="dz-filename">
          文件名：
          <span title={file.name} className="dz-filename-text">{file.name}</span>
          </div>
          <div className="dz-size">
            <span>大小：{size.join(' ')}</span>
          </div>
        </div>
        {progress}
      </div>
    );
  }
});

module.exports = DzPreview;

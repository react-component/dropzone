/** @jsx React.DOM */
'use strict';

var React = require('react');
var fileInputCss = {
  visibility: 'hidden',
  height: 0,
  width: 0
};

var FileInput = React.createClass({

  getDefaultProps: function() {
    return {
      name: 'file',
      upload: function() {}
    };
  },

  getInitialState: function() {
    return {};
  },

  onChange: function() {
    var fileList = this.getDOMNode().files;
    var len = fileList.length;
    for (var i = 0; i < len; i++) {
      var file = fileList.item(i);
      this.props.upload(file);
    }
    // 删除value, 否则同一个文件重新上传，不会触发change事件
    this.refs.fileInput.getDOMNode().value = '';
  },

  render: function() {
    var css = fileInputCss;
    return (
      <input type="file"
        ref="fileInput"
        name={this.props.name}
        style={css}
        multiple="multiple"
        onChange={this.onChange}/>
    );
  }
});

module.exports = FileInput;

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
      accept: '',
      upload: function() {}
    };
  },

  getInitialState: function() {
    return {};
  },

  onChange: function(e) {
    var input = e.target;
    var fileList = input.files;
    this.props.upload(fileList);
    // 删除value, 否则同一个文件重新上传，不会触发change事件
    input.value = '';
  },

  render: function() {
    var css = fileInputCss;
    return (
      <input type="file"
        name={this.props.name}
        style={css}
        multiple="multiple"
        accept={this.props.accept}
        onChange={this.onChange}/>
    );
  }
});

module.exports = FileInput;

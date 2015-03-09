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
      addFile: function() {}
    };
  },

  getInitialState: function() {
    return {};
  },

  onChange: function() {
    var fileList = this.getDOMNode().files;
    var len = fileList.length;
    for (var i = 0; i < len; i++) {
      this.props.addFile(fileList.item(i));
    }
  },

  render: function() {
    var css = fileInputCss;
    return (
      <input type="file" name={this.props.name}
        style={css} multiple="multiple" onChange={this.onChange} />
    );
  }
});

module.exports = FileInput;

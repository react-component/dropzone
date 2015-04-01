// use jsx to render html, do not modify simple.html
var Dropzone = require('../lib/Dropzone');
require('../assets/index.css');
require('./simple.css');
var React = require('react');
function accept(file) {
  if (file.type.indexOf('image/') > -1) {
    return Promise.resolve();
  }
  return Promise.reject('只允许上传图片文件');
}

React.render(
  <div>
    <Dropzone action="http://127.0.0.1:3000/" accept={accept}>
      <div className="dz-message">
        Drop files here or click to upload.<br/>
        <span className="note">上传1</span>
      </div>
    </Dropzone>
    <Dropzone action="http://127.0.0.1:3000/" className="next dropzone">
      <div className="dz-message">
        Drop files here or click to upload.<br/>
        <span className="note">上传2</span>
      </div>
    </Dropzone>
  </div>,
  document.getElementById('__react-content')
);

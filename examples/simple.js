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

var data = {type: 'haha'};

var dropzone = React.render(
  <Dropzone
    action="simple.html"
    accept={accept}
    inputAccept="image/*"
    success={success}
    error={error}
    data={data}
  >
    <div className="dz-message">
      Drop files here or click to upload.<br/>
      <span className="note">(This is just a demo dropzone. Selected files are
        <strong>not</strong> actually uploaded.)</span>
    </div>
  </Dropzone>,
  document.getElementById('__react-content')
);

function success(urls) {
  console.log(urls);
}

function error(e, file) {
}

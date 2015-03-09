// use jsx to render html, do not modify simple.html
var Dropzone = require('../lib/Dropzone');
require('./simple.css')
var React = require('react');
React.render(
    <Dropzone action="http://127.0.0.1:3000/">
      <div className="dz-message">
        Drop files here or click to upload.<br/>
        <span className="note">(This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)</span>
      </div>
    </Dropzone>,
    document.getElementById('__react-content'));

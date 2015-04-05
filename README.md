# rc-dropzone
---

dropzone ui component for react

[![NPM version][npm-image]][npm-url]
[![SPM version](http://spmjs.io/badge/rc-dropzone)](http://spmjs.io/package/rc-dropzone)
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![node version][node-image]][node-url]

[![Sauce Test Status](https://saucelabs.com/browser-matrix/rc-dropzone.svg)](https://saucelabs.com/u/rc-dropzone)

[npm-image]: http://img.shields.io/npm/v/rc-dropzone.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-dropzone
[travis-image]: https://img.shields.io/travis/shepherdwind/rc-dropzone.svg?style=flat-square
[travis-url]: https://travis-ci.org/shepherdwind/rc-dropzone
[coveralls-image]: https://img.shields.io/coveralls/shepherdwind/rc-dropzone.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/shepherdwind/rc-dropzone?branch=master
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/


## Feature

dropzone for react.

## install

[![rc-dropzone](https://nodei.co/npm/rc-dropzone.png)](https://npmjs.org/package/rc-dropzone)

## Usage

```js
var Rcdropzone = require('rc-dropzone');
var React = require('react');

function accept(file) {
  if (file.type.indexOf('image/') > -1) {
    return Promise.resolve();
  }
  return Promise.reject('只允许上传图片文件');
}

React.render(
  <Dropzone action="http://127.0.0.1:3000/" accept={accept}>
    <div className="dz-message">
      Drop files here or click to upload.<br/>
      <span className="note">(This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)</span>
    </div>
  </Dropzone>,
  document.getElementById('__react-content'));

## API

### props

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th style="width: 50px;">default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>className</td>
          <td>String</td>
          <td></td>
          <td>additional css class of root dom node</td>
        </tr>
    </tbody>
</table>


online docs: http://spmjs.io/docs/rc-dropzone/

## Development

```
npm install
npm start
```

## Example

http://localhost:8000/examples/index.md

online example: http://spmjs.io/docs/rc-dropzone/examples/

## Test Case

http://localhost:8000/tests/runner.html?coverage

## Coverage

http://localhost:8000/node_modules/rc-server/node_modules/node-jscover/lib/front-end/jscoverage.html?w=http://localhost:8000/tests/runner.html?coverage

## License

rc-dropzone is released under the MIT license.

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

React.render(
  <Dropzone action="http://127.0.0.1:3000/">
    <div className="dz-message">
      Drop files here or click to upload.<br/>
      <span className="note">(This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)</span>
    </div>
  </Dropzone>,
  document.getElementById('__react-content'));
```

## API

### props

|name|type|默认值| 说明|
|-----+---+--------|----|
|paramName| string | 'file' | 文件上传参数名 |
|accept | function | | 返回一个Promise对象 |
|inputAccept| string | '' | file的accept参数|
| data | object | {} | 其他参数 |
| success | function | | 上传成功回调 |
| error | function || 上传失败回调 |

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

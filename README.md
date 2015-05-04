# rc-dropzone
---

dropzone ui component for react, support for IE11+, chrome and firefox.

[![NPM version][npm-image]][npm-url]
[![SPM version](http://spmjs.io/badge/rc-dropzone)](http://spmjs.io/package/rc-dropzone)
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![node version][node-image]][node-url]

[![Sauce Test Status][saucelabs-image]][saucelabs-url]

[npm-image]: http://img.shields.io/npm/v/rc-dropzone.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-dropzone
[travis-image]: https://img.shields.io/travis/react-component/dropzone.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/dropzone
[coveralls-image]: https://img.shields.io/coveralls/react-component/dropzone.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/dropzone?branch=master
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[saucelabs-image]: https://saucelabs.com/browser-matrix/dropzone.svg
[saucelabs-url]: https://saucelabs.com/u/dropzone

![dropzone](https://cloud.githubusercontent.com/assets/452899/7336023/99e4753a-ec18-11e4-8052-b72136deef98.gif)

## Feature

dropzone for react.

## install

[![rc-dropzone](https://nodei.co/npm/rc-dropzone.png)](https://npmjs.org/package/rc-dropzone)

## Usage

```js
var Dropzone = require('rc-dropzone');
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
|-----|---|--------|----|
|paramName| string | file | 文件上传参数名 |
|accept | function | 接受所有文件| 返回一个Promise对象 |
|inputAccept| string | 空字符串 | file的accept参数|
| data | object | {} | post文件的时候，发送的其他参数 |
| success | function |无 | 上传成功回调 |
| error | function |无| 上传失败回调 |

> 说明：accept方法必须返回一个Promise对对象，通过resolve表示成功状态，reject表示失败，
> reject的第一个参数是错误信息.

## Development

```
npm install
npm start
```

## Example

http://localhost:8000/examples/

online example: http://react-component.github.io/dropzone/build/examples/

## Test Case

http://localhost:8000/tests/runner.html?coverage

## Coverage

http://localhost:8000/node_modules/rc-server/node_modules/node-jscover/lib/front-end/jscoverage.html?w=http://localhost:8000/tests/runner.html?coverage

## License

rc-dropzone is released under the MIT license.

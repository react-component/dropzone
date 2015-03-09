# rc-dropzone
---

dropzone ui component for react

[![NPM version][npm-image]][npm-url]
[![SPM version](http://spmjs.io/badge/rc-dropzone)](http://spmjs.io/package/rc-dropzone)
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]
[![Sauce Test Status](https://saucelabs.com/buildstatus/rc-dropzone)](https://saucelabs.com/u/rc-dropzone)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/rc-dropzone.svg)](https://saucelabs.com/u/rc-dropzone)

[npm-image]: http://img.shields.io/npm/v/rc-dropzone.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-dropzone
[travis-image]: https://img.shields.io/travis/react-component/dropzone.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/dropzone
[coveralls-image]: https://img.shields.io/coveralls/react-component/dropzone.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/dropzone?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/react-component/dropzone.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/react-component/dropzone
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-dropzone.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-dropzone

## Screenshots

<img src="http://gtms02.alicdn.com/tps/i2/TB1luFKHXXXXXb3XXXXl4OqLpXX-574-596.png" width="288"/>


## Feature

* support ie8,ie8+,chrome,firefox,safari

### Keyboard

* Previous month (PageUp)
* Next month (PageDown)
* tab into hour input: Last hour(Up), Next hour(Down)
* tab into hour input: Last minute(Up), Next minute(Down)
* tab into hour input: Last second(Up), Next second(Down)
* Last year (Control + left)
* Next year (Control + right)

## install

[![rc-dropzone](https://nodei.co/npm/rc-dropzone.png)](https://npmjs.org/package/rc-dropzone)

## Usage

```js
var Rcdropzone = require('rc-dropzone');
var React = require('react');
React.render(<Rcdropzone />, container);

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

webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// use jsx to render html, do not modify simple.html
	var Dropzone = __webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(7);
	var React = __webpack_require__(3);
	function accept(file) {
	  if (file.type.indexOf('image/') > -1) {
	    return Promise.resolve();
	  }
	  return Promise.reject('只允许上传图片文件');
	}

	React.render(
	  React.createElement("div", null, 
	    React.createElement(Dropzone, {action: "http://127.0.0.1:3000/", accept: accept}, 
	      React.createElement("div", {className: "dz-message"}, 
	        "Drop files here or click to upload.", React.createElement("br", null), 
	        React.createElement("span", {className: "note"}, "上传1")
	      )
	    ), 
	    React.createElement(Dropzone, {action: "http://127.0.0.1:3000/", className: "next dropzone"}, 
	      React.createElement("div", {className: "dz-message"}, 
	        "Drop files here or click to upload.", React.createElement("br", null), 
	        React.createElement("span", {className: "note"}, "上传2")
	      )
	    )
	  ),
	  document.getElementById('__react-content')
	);


/***/ }
]);
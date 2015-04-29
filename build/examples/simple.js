webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ },
/* 1 */,
/* 2 */
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

	var data = {type: 'haha'};

	var dropzone = React.render(
	  React.createElement(Dropzone, {
	    action: "simple.html", 
	    accept: accept, 
	    inputAccept: "image/*", 
	    success: success, 
	    error: error, 
	    data: data
	  }, 
	    React.createElement("div", {className: "dz-message"}, 
	      "Drop files here or click to upload.", React.createElement("br", null), 
	      React.createElement("span", {className: "note"}, "(This is just a demo dropzone. Selected files are", 
	        React.createElement("strong", null, "not"), " actually uploaded.)")
	    )
	  ),
	  document.getElementById('__react-content')
	);

	function success(urls) {
	  console.log(urls);
	}

	function error(e, file) {
	}


/***/ }
]);
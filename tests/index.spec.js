/** @jsx React.DOM */

var expect = require('expect.js');
var fakeDom = require('./utils/fakeDom');
var Dropzone = require('../index');
var DzPreview = require('../lib/DzPreview');
var FileInput = require('../lib/FileInput');
var sinon = require('sinon');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var getByClass = TestUtils.findRenderedDOMComponentWithClass;

var fakeRequest = require('./utils/request');
var request = require('superagent');

function wait(time) {
  time = time || 10;
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve();
    }, time);
  });
}

describe('Dropzone', function () {
  var container = document.createElement('div');
  document.body.appendChild(container);

  afterEach(function () {
     React.unmountComponentAtNode(container);
  });

  describe('Dropzone', function() {
    var self;
    var input;
    var isAccpte = true;
    function accept(file) {
      if (isAccpte === true) {
        return Promise.resolve(file);
      }
      return Promise.reject(isAccpte);
    }

    var config = {accept: accept};

    beforeEach(function(done) {
      React.render(<Dropzone action="a.do" accept={config.accept}/>, container, function() {
        input = TestUtils.findRenderedDOMComponentWithTag(this, 'input');
        self = this;
        done();
      });
    });
    afterEach(function() {
      request.post.restore();
    });

    it('upload success', function(done) {
      var ret = {text: 'ok', status: 200};
      sinon.stub(request, 'post', fakeRequest.post(ret));
      wait()
      .then(function() {
        TestUtils.Simulate.change(input.getDOMNode(), {target: fakeDom});
        return wait(100);
      })
      .then(function() {
        expect(request.post.calledOnce).eql(true);
        expect(request.post.calledWith('a.do')).eql(true);
        var preview = getByClass(self, 'dz-preview');
        expect(preview.props.className).to.contain('dz-success');
        done();
      })
      .catch(done);
    });

    it('upload error', function(done) {
      var ret = {text: 'error', status: 400};
      sinon.stub(request, 'post', fakeRequest.post(ret));
      wait()
      .then(function() {
        TestUtils.Simulate.change(input.getDOMNode(), {target: fakeDom});
        return wait(100);
      })
      .then(function() {
        expect(request.post.calledOnce).eql(true);
        var preview = getByClass(self, 'dz-preview');
        expect(preview.props.className).to.contain('dz-error');
        done();
      })
      .catch(done);
    });

    it('config accept error', function(done) {
      var ret = {text: 'error', status: 400};
      isAccpte = 'not ok';
      sinon.stub(request, 'post', fakeRequest.post(ret));
      wait()
      .then(function() {
        TestUtils.Simulate.change(input.getDOMNode(), {target: fakeDom});
        expect(request.post.calledOnce).to.eql(false);
        return wait();
      })
      .then(function() {
        var preview = getByClass(self, 'dz-preview');
        expect(preview.props.className).to.contain('dz-error');
        done();
      })
      .catch(done);
    });

  });

  describe('DzPreview', function() {
    var preview;
    var file = {
      size: 1234,
      name: 'demo.jpg',
      thumbnail: 'https://t.alipayobjects.com/tfscom/T1Yy4eXd8cXXXXXXXX.png'
    };

    function render() {
      return new Promise(function(resolve) {
        React.render(<div className="dropzone">
          <DzPreview file={file} />
          </div>, container, function() {
            var self = this;
            preview = self;
          resolve();
        });
      });
    }

    it('start upload state', function(done) {
      render()
      .then(function() {
        var img = getByClass(preview, 'dz-img');
        expect(img.props.style.backgroundImage).to.contain(file.thumbnail);
        var progress = getByClass(preview, 'dz-upload');
        expect(progress.props.style.width).to.eql('0%');
        done();
      })
      .catch(done);
    });

    it('progress to 50%', function(done) {
      file.percent = 50;
      render()
      .then(function() {
        var progress = getByClass(preview, 'dz-upload');
        expect(progress.props.style.width).to.eql('50%');
        done();
      })
      .catch(done);
    });

    it('success', function(done) {
      file.done = true;
      render()
      .then(function() {
        var box = getByClass(preview, 'dz-preview');
        expect(box.props.className).to.contain('dz-success');
        done();
      })
      .catch(done);
    });

    it('error', function(done) {
      file.done = '错误发生啦';
      render()
      .then(function() {
        var progress = TestUtils.scryRenderedDOMComponentsWithClass(preview,
          'dz-upload');
        expect(progress.length).to.eql(0);
        var box = getByClass(preview, 'dz-preview');
        expect(box.props.className).to.contain('dz-error');
        done();
      })
      .catch(done);
    });
  });

  describe('FileInput', function() {
    var input;
    var upload;
    beforeEach(function(done) {
      upload = sinon.stub();
      React.render(<div className="dropzone">
        <FileInput upload={upload} />
        </div>, container, function() {
        input = TestUtils.findRenderedDOMComponentWithTag(this, 'input');
        done();
      });
    });

    it('basic', function() {
      TestUtils.Simulate.change(input.getDOMNode(), {target: fakeDom});
      expect(upload.calledOnce).to.ok;
      expect(upload.calledWith(fakeDom.files[0])).to.ok;
      expect(fakeDom.value).to.eql('');
    });
  });
});

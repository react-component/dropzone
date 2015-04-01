/** @jsx React.DOM */

var expect = require('expect.js');
require('../index');
var DzPreview = require('../lib/DzPreview');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var getByClass = TestUtils.findRenderedDOMComponentWithClass;

describe('Dropzone', function () {
  var preview;
  var file = {
    size: 1234,
    name: 'demo.jpg',
    thumbnail: 'https://t.alipayobjects.com/tfscom/T1Yy4eXd8cXXXXXXXX.png'
  };
  var container = document.createElement('div');
  document.body.appendChild(container);

  function render() {
    return new Promise(function(resolve, reject) {
      React.render(<div className="dropzone">
        <DzPreview file={file} />
        </div>, container, function() {
        preview = this;
        resolve();
      });
    });
  }

  afterEach(function () {
     React.unmountComponentAtNode(container);
  });

  describe('DzPreview', function() {
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
        var progress = TestUtils.scryRenderedDOMComponentsWithClass(preview,
          'dz-upload');
        expect(progress.length).to.eql(0);
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
});

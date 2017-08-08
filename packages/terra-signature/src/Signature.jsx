import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';
import './Signature.scss';
import $ from 'jquery';

const propTypes = {

  /**
  * Sets the line width.
  */
  lineWidth: PropTypes.number,

  /**
  * Line segments that define signature.
  */
  lineSegments: PropTypes.array,

  /**
   * A callback function to execute when a line segment is drawn. The first parameter is the event, the 
   * second parameter is all the line segments, and the last parameter is the most recent line segment drawn.
   */
  onChange: PropTypes.func,

};

const defaultProps = {
  lineWidth: 1,
  lineSegments: undefined,
  onChange: undefined,
};

class Signature extends React.Component {

  constructor() {
    super();

    this.state = {
      lineSegments: []
    }
  }

  clearSignature() {
    this.setState( {lineSegments: [], } );

    var canvas = $('canvas.terra-Signature')[0];
    var context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  _addLine(x, y, dragging) {
    var newSegment;
    if (dragging) {
        var lastLineSegment = this.state.lineSegments[this.state.lineSegments.length-1];
        newSegment = { x1:lastLineSegment.x2, y1:lastLineSegment.y2, x2:x, y2:y };
    }
    else {
      newSegment = { x1:x, y1:y, x2:x, y2:y };
    }

    // Set New Line
    this.setState({
      lineSegments: [...this.state.lineSegments, newSegment],
    });
  }

  _draw() {
    var canvas = $('canvas.terra-Signature')[0];
    var context = canvas.getContext('2d');

    if (this.state.lineSegments.length > 0) {
      var lastLineSegment = this.state.lineSegments[this.state.lineSegments.length-1];

      context.strokeStyle = '#000000';
      context.lineJoin = 'round';

      context.beginPath();
      context.moveTo(lastLineSegment.x1, lastLineSegment.y1);
      context.lineTo(lastLineSegment.x2, lastLineSegment.y2);

      context.stroke();
    }
  }

  _drawSignature(lineSegments) {
    var canvas = $('canvas.terra-Signature')[0];
    var context = canvas.getContext('2d');

    context.strokeStyle = '#000000';
    context.lineJoin = 'round';

    // clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    var segmentCount = lineSegments.length;
    for (var i = 0; i < segmentCount; i++) {
      context.beginPath();
      context.moveTo(lineSegments[i].x1, lineSegments[i].y1);
      context.lineTo(lineSegments[i].x2, lineSegments[i].y2);

      context.stroke();
    }
  }

  _mouseDown(event) {
  	var canvas = $('canvas.terra-Signature')[0];

    this.setState({painting: true,});

    this._addLine(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, false);

    this._draw();
  }

  _mouseUp(event) {
    this.setState({painting: false,});

    if (this.props.onChange) {
      this.props.onChange(event, this.state.lineSegments, this.state.lineSegments[this.state.lineSegments.length - 1]);
    }
  }

  _mouseXY(event) {
    var canvas = $('canvas.terra-Signature')[0];

    if (this.state.painting) {
      this._addLine(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, true);
      this._draw();
    }
  }

  componentWillUnmount() {
    console.log('Component WILL UNMOUNT!')

    window.removeEventListener("resize", this._updateDimensions);
  }

  componentDidMount() {
  	console.log('Component DID MOUNT!')

    var canvas = $('canvas.terra-Signature');

    console.log(this.parentNode);

  	this.parentNode.addEventListener ('mousedown', e => this._mouseDown (e));
  	this.parentNode.addEventListener ('mousemove', e => this._mouseXY (e));
    document.body.addEventListener('mouseup', e => this._mouseUp (e));

	  //For mobile
	  this.parentNode.addEventListener ('touchstart', e => this._mouseDown (e), false);
  	this.parentNode.addEventListener ('touchmove', e => this._mouseXY (e), true);
  	this.parentNode.addEventListener ('touchend', e => this._mouseUp (e), false);
    document.body.addEventListener("touchcancel", e => this._mouseUp.bind(this), false);

    this.parentNode.width = canvas.width();
    this.parentNode.height = canvas.height();

    var context = this.parentNode.getContext('2d');

    let {lineWidth} = Object.assign({}, defaultProps, this.props);
    context.lineWidth = lineWidth;

    if (this.props.lineSegments) {
      this.state.lineSegments = this.props.lineSegments;
      this._drawSignature(this.state.lineSegments);
    }

    window.addEventListener("resize", e => this._updateDimensions (e));

  }

  _updateDimensions(event) {
    var canvas = $('canvas.terra-Signature');

    console.log(this.parentNode);

    this.parentNode.width = canvas.width();
    this.parentNode.height = canvas.height();

    this._drawSignature(this.state.lineSegments);
  }

  render() {
    return (
      <canvas className='terra-Signature' ref={(node)=>{this.parentNode=node;}} />
    );
  }

};

Signature.propTypes = propTypes;
Signature.defaultProps = defaultProps;

export default Signature;

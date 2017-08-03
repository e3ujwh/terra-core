import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';
import './Signature.scss';
import $ from 'jquery';
import {paint} from './actions'

const propTypes = {
 /*
 * Content to be displayed as the name
 */
  name: PropTypes.string,
};

const defaultProps = {

  /**
   * Lines drawn for signature.
   */

};

class Signature extends React.Component {

  constructor() {
    super();

    this.state = {
      coordinates: [],
      canvasInitialized: false,
      padWidth: 400,
      signatureLimits: {
        minX: null,
        maxX: null,
        minY: null,
        maxY: null
      }
    }

    this.setParentNode = this.setParentNode.bind(this);

  }

  setParentNode(node) {
    this.parentNode = node;
  }

  _addLine(x, y, dragging) {
    var newLine = {
      x: x,
      y: y,
      dragging: dragging
    };

    this._updateLimits(x, y);

    // Set New Point Coordinates
    this.setState({
      coordinates: [...this.state.coordinates, newLine],
    });
  }

  _updateLimits(x, y) {
    var minX = this.state.signatureLimits.minX;
    var maxX = this.state.signatureLimits.maxX;
    var minY = this.state.signatureLimits.minY;
    var maxY = this.state.signatureLimits.maxY;

    if (minX == null || x < minX) { minX = x; }
    if (maxX == null || x > maxX) { maxX = x; }
    if (minY == null || y < minY) { minY = y; }
    if (maxY == null || y > maxY) { maxY = y; }

    this.setState({
      signatureLimits: {
        minX: minX,
        maxX: maxX,
        minY: minY,
        maxY: maxY
      },
    });
  }

  _draw() {
    var canvas = $('.esig-signature-body canvas#signature')[0];
    var context = canvas.getContext('2d');

    if (this.state.coordinates.length >= 2) {
      var previous_point = this.state.coordinates[this.state.coordinates.length-2];
      var last_point = this.state.coordinates[this.state.coordinates.length-1];

      if (last_point.dragging) {
        context.strokeStyle = '#000000';
        context.lineJoin = 'miter';
        context.lineWidth = 1;

        context.beginPath();

        context.moveTo(previous_point.x, previous_point.y);
        context.lineTo(last_point.x, last_point.y);

        context.stroke();
      }
    }
  }

  _mouseDown(event) {
  	var canvas = $('canvas.terra-Signature')[0];

  	dispatch(paint(true));

 //   this._addLine(event.pageX - canvas.offset().left, event.pageY - canvas.offset().top, false);

    this._draw();
  }

  _mouseUp(event) {
  	dispatch(paint(false));

 //   lines = this._convertToLines();
  }

  _mouseXY(event) {
    var canvas = $('.esig-signature-body canvas#signature');

 //   if (this.state.painting) {
 //     this._addLine(event.pageX - canvas.offset().left, event.pageY - canvas.offset().top, true);
 //     this._draw();
 //   }
  }
  
  componentDidMount() {
  	console.log('Component DID MOUNT!')

//  	var canvas = document.getElementsByClassName('terra-Signature')[0];
    var canvas = $('canvas.terra-Signature')[0];

  	console.log(canvas);

  	this.parentNode.addEventListener ('mousedown', e => this._mouseDown (e));
  	this.parentNode.addEventListener ('mousemove', e => this._mouseXY (e));
  	this.parentNode.addEventListener ('mouseup', e => this._mouseUp (e));

	//For mobile
	this.parentNode.addEventListener ('touchstart', e => this._mouseDown (e));
  	this.parentNode.addEventListener ('touchmove', e => this._mouseXY (e));
  	this.parentNode.addEventListener ('touchend', e => this._mouseUp (e));
  }

  render() {
    return (
      <canvas className='terra-Signature' ref={this.setParentNode} />
    );
  }

};

Signature.propTypes = propTypes;
Signature.defaultProps = defaultProps;

export default Signature;

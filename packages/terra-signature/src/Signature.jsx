import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import 'terra-base/lib/baseStyles';
import './Signature.scss';

const propTypes = {

  /**
  * Sets the line width.
  */
  lineWidth: PropTypes.number,

  /**
  * Sets the line width.
  */
  lineColor: PropTypes.string,

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
  lineColor: '#000000',
  lineSegments: undefined,
  onChange: undefined,
};

class Signature extends React.Component {

  constructor() {
    super();

    this.state = { lineSegments: [] };
  }

  componentDidMount() {
    const canvas = $('canvas.terra-Signature');

    this.parentNode.addEventListener('mousedown', e => this.mouseDown(e));
    this.parentNode.addEventListener('mousemove', e => this.mouseXY(e));
    document.body.addEventListener('mouseup', e => this.mouseUp(e));

    // For mobile
    this.parentNode.addEventListener('touchstart', e => this.mouseDown(e), false);
    this.parentNode.addEventListener('touchmove', e => this.mouseXY(e), true);
    this.parentNode.addEventListener('touchend', e => this.mouseUp(e), false);
    document.body.addEventListener('touchcancel', e => this.mouseUp(e).bind(this), false);

    this.parentNode.width = canvas.width();
    this.parentNode.height = canvas.height();

    const context = this.parentNode.getContext('2d');

    const { lineWidth, lineColor } = Object.assign({}, defaultProps, this.props.lineWidth, this.props.lineColor);
    context.lineWidth = lineWidth;
    context.strokeStyle = lineColor;

    if (this.props.lineSegments) {
      this.state.lineSegments = this.props.lineSegments;
      this.drawSignature(this.state.lineSegments);
    }

    window.addEventListener('resize', () => this.updateDimensions());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.updateDimensions());
  }

  mouseDown(event) {
    const canvas = $('canvas.terra-Signature')[0];

    this.setState({ painting: true });
    this.addLine(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, false);

    this.draw();
  }

  mouseUp(event) {
    this.setState({ painting: false });

    if (this.props.onChange) {
      this.props.onChange(event, this.state.lineSegments, this.state.lineSegments[this.state.lineSegments.length - 1]);
    }
  }

  mouseXY(event) {
    const canvas = $('canvas.terra-Signature')[0];

    if (this.state.painting) {
      this.addLine(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, true);
      this.draw();
    }
  }

  addLine(x, y, dragging) {
    let newSegment;

    if (dragging) {
      const lastLineSegment = this.state.lineSegments[this.state.lineSegments.length - 1];
      newSegment = { x1: lastLineSegment.x2, y1: lastLineSegment.y2, x2: x, y2: y };
    } else {
      newSegment = { x1: x, y1: y, x2: x, y2: y };
    }

    // Record new line segment
    this.setState({ lineSegments: [...this.state.lineSegments, newSegment] });
  }


  draw() {
    const canvas = $('canvas.terra-Signature')[0];
    const context = canvas.getContext('2d');

    if (this.state.lineSegments.length > 0) {
      const lastLineSegment = this.state.lineSegments[this.state.lineSegments.length - 1];

      context.lineJoin = 'round';

      context.beginPath();
      context.moveTo(lastLineSegment.x1, lastLineSegment.y1);
      context.lineTo(lastLineSegment.x2, lastLineSegment.y2);

      context.stroke();
    }
  }

  drawSignature(lineSegments) {
    const canvas = $('canvas.terra-Signature')[0];
    const context = canvas.getContext('2d');

    context.lineJoin = 'round';

    const { lineWidth, lineColor } = Object.assign({}, defaultProps, this.props.lineWidth, this.props.lineColor);
    context.lineWidth = lineWidth;
    context.strokeStyle = lineColor;

    // clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // iterate and draw all recorded line segments
    const segmentCount = lineSegments.length;
    for (let i = 0; i < segmentCount; i += 1) {
      context.beginPath();
      context.moveTo(lineSegments[i].x1, lineSegments[i].y1);
      context.lineTo(lineSegments[i].x2, lineSegments[i].y2);

      context.stroke();
    }
  }

  clearSignature() {
    this.setState({ lineSegments: [] });

    const canvas = $('canvas.terra-Signature')[0];
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  updateDimensions() {
    const canvas = $('canvas.terra-Signature');

    this.parentNode.width = canvas.width();
    this.parentNode.height = canvas.height();

    this.drawSignature(this.state.lineSegments);
  }

  render() {
    return (
      <canvas className="terra-Signature" ref={(node) => { this.parentNode = node; }} />
    );
  }

}

Signature.propTypes = propTypes;
Signature.defaultProps = defaultProps;

export default Signature;

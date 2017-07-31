import React from 'react';
import PropTypes from 'prop-types';
import Portal from 'react-portal';
import MagicContent from './_MagicContent';
import MagicUtils from './_MagicUtils';

const ATTACHMENT_POSITIONS = [
  'top left',
  'top center',
  'top right',
  'middle left',
  'middle center',
  'middle right',
  'bottom left',
  'bottom center',
  'bottom right',
];

const propTypes = {
  /**
   * Depth in px of the margin to allow for an arrow.
   */
  arrowDepth: PropTypes.number,
  /**
   * Reference to the bonding container, wil use window if nothing is provided.
   */
  boundingRef: PropTypes.func,
  /**
   * The content to be magicked.
   */
  content: PropTypes.element.isRequired,
  /**
   * String pair seperated by a space using values of top, middle, bottom, and left, center, right.
   */
  contentAttachment: PropTypes.oneOf(ATTACHMENT_POSITIONS).isRequired,
  /**
   * String pair of top and left offset, ie "10px -4px".
   */
  contentOffset: PropTypes.string,
  /**
   * Should element be actively magicked to the page.
   */
  isEnabled: PropTypes.bool,
  /**
   * Should element be presented.
   */
  isOpen: PropTypes.bool,
  /**
   * Required element to be presented and magicked to.
   */
  targetRef: PropTypes.func.isRequired,
  /**
   * String pair of top, middle, bottom, and left, center, right.
   */
  targetAttachment: PropTypes.oneOf(ATTACHMENT_POSITIONS),
  /**
   * String pair of top and left offset, ie "10px -4px".
   */
  targetOffset: PropTypes.string,
  /**
   * Callback function when the magic is moved.
   */
  onPosition: PropTypes.func,
};

const defaultProps = {
  isEnabled: false,
  disableOnPosition: false,
};

class Magic extends React.Component {
  constructor(props) {
    super(props);
    this.setContentNode = this.setContentNode.bind(this);
    this.getNodeRects = this.getNodeRects.bind(this);
    this.update = this.update.bind(this);
    this.state = { isEnabled: this.props.isEnabled };
  }

  componentDidMount() {
    if (this.state.isEnabled) {
      this.enable();
    }
    this.update();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isEnabled !== this.props.isEnabled) {
      this.setState({ isEnabled: newProps });
    }
  }

  componentDidUpdate() {
    if (this.state.isEnabled) {
      this.enable();
    } else {
      this.disable();
    }
    this.update();
  }

  componentWillUnmount() {
    this.destroy();
  }

  setContentNode(node) {
    this.contentNode = node;
  }

  getNodeRects() {
    const targetRect = MagicUtils.getBounds(this.props.targetRef());
    const contentRect = MagicUtils.getBounds(this.contentNode);
    const boundingRect = MagicUtils.getBoundingRect(this.props.boundingRef ? this.props.boundingRef() : 'window');
    return { targetRect, contentRect, boundingRect };
  }

  enable() {
    ['resize', 'scroll', 'touchmove'].forEach(event => window.addEventListener(event, this.update));

    const target = this.props.targetRef();
    this.scrollParents = MagicUtils.getScrollParents(target);
    this.scrollParents.forEach((parent) => {
      if (parent !== target.ownerDocument) {
        parent.addEventListener('scroll', this.update);
      }
    });
  }

  disable() {
    ['resize', 'scroll', 'touchmove'].forEach(event => window.removeEventListener(event, this.update));

    const target = this.props.targetRef();
    if (this.scrollParents) {
      this.scrollParents.forEach((parent) => {
        if (parent !== target.ownerDocument) {
          parent.removeEventListener('scroll', this.update);
        }
      });
    }
  }

  position(event) {
    let rects = this.getNodeRects();
    const style = MagicUtils.positionStyleFromBounds(rects.boundingRect, rects.targetRect, rects.contentRect, this.props.contentOffset, this.props.targetOffset, this.props.contentAttachment, this.props.targetAttachment, this.props.arrowDepth);
    this.contentNode.style.position = style.position;
    this.contentNode.style.left = style.left;
    this.contentNode.style.top = style.top;
    this.contentNode.style.transform = 'none';

    if (this.props.onPosition) {
      rects = this.getNodeRects();
      this.props.onPosition(event, rects.targetRect, rects.contentRect);
    }
  }

  destroy() {
    this.disable();
    this.contentNode = null;
  }

  update(event) {
    if (!this.props.targetRef() || !this.contentNode) {
      return;
    }

    this.updateMagic(event);
  }

  updateMagic(event) {
    this.position(event);
  }

  render() {
    const {
      arrowDepth,
      boundingRef,
      content,
      contentAttachment,
      contentOffset,
      isEnabled,
      isOpen,
      targetRef,
      targetAttachment,
      targetOffset,
      onPosition,
      ...customProps
    } = this.props;

    return (
      <Portal isOpened={isOpen}>
        <MagicContent {...customProps} content={content} refCallback={this.setContentNode} />
      </Portal>
    );
  }
}

Magic.propTypes = propTypes;
Magic.defaultProps = defaultProps;
Magic.attachmentPositions = ATTACHMENT_POSITIONS;

export default Magic;
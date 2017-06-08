import React from 'react';
import Popup from '../../../lib/Popup';

class DimensionPopup extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.setButtonNode = this.setButtonNode.bind(this);
    this.getButtonNode = this.getButtonNode.bind(this);
    this.setParentNode = this.setParentNode.bind(this);
    this.getParentNode = this.getParentNode.bind(this);
    this.state = { open: false };
  }

  setButtonNode(node) {
    this.buttonNode = node;
  }

  getButtonNode() {
    return this.buttonNode;
  }

  setParentNode(node) {
    this.parentNode = node;
  }

  getParentNode() {
    return this.parentNode;
  }

  handleButtonClick() {
    this.setState({ open: true });
  }

  handleRequestClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div style={{ position: 'relative', height: '100%', width: '100%', overflow: 'auto' }}>
        <div style={{ height: '675px', width: '1250px', background: 'aliceblue' }} ref={this.setParentNode}>
          <Popup
            boundingRef={this.getParentNode}
            contentDimensions="75x 75x"
            isOpen={this.state.open}
            onRequestClose={this.handleRequestClose}
            targetRef={this.getButtonNode}
          >
            <p>This popup is 75x by 75x.</p>
          </Popup>
          <button id="dimension-button" onClick={this.handleButtonClick} ref={this.setButtonNode}>
            75x Popup
          </button>
        </div>
      </div>  
    );
  }
}

export default DimensionPopup;

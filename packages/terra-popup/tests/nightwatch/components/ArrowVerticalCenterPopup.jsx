import React from 'react';
import Popup from '../../../lib/Popup';

class AlignmentPopup extends React.Component {
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
      <div style={{ position: 'relative', height: '200px', width: '200px', background: 'aliceblue' }} ref={this.setParentNode}>
        <Popup
          boundingRef={this.getParentNode}
          contentAttachment="top center"
          contentDimensions="10x 10x"
          isArrowDisplayed
          isOpen={this.state.open}
          onRequestClose={this.handleRequestClose}
          targetRef={this.getButtonNode}
        >
          <p style={{padding: '5px'}}>This popup arrow was aligned to the center.</p>
        </Popup>
        <div id="alignment-button" style={{position: 'absolute', left: 'calc(50% - 10px)', height: '20px', width: '20px', backgroundColor: '#c00'}} onClick={this.handleButtonClick} ref={this.setButtonNode} />
      </div>
    );
  }
}

export default AlignmentPopup;

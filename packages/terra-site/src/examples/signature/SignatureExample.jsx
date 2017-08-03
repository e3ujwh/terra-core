import React from 'react';
import Signature from 'terra-signature/lib/Signature';
import Button from 'terra-button';

class SignatureExample extends React.Component {
  constructor() {
    super();

    this.state = { show: false };
  }

  handleTriggerSignature() {
    this.setState({ show: true, relative: true });
  }

  render() {
    return (
      <div style={{ height: '100px', width: '100%', border: '1px solid black'}} >
        <Signature/>
      </div>
    );
  }
}

export default SignatureExample;

import React from 'react';

import Signature from 'terra-signature/lib/Signature';

class SignatureExample extends React.Component {
  constructor() {
    super();

    this.state = { show: false, lineSegments: [] };
  }

  handleChange(event, lineSegments, lastSegment){
  }

  render() {
    return (      
      <div style={{ height: '100px', width: '100%', border: '1px solid black'}} >
        <Signature ref={instance => { this.signature = instance; }} lineWidth={Signature.Width.FINE} lineColor={'#00008B'} lineSegments={this.state.lineSegments} onChange={this.handleChange.bind(this)}/>
      </div>
    );
  }
}

export default SignatureExample;

import React from 'react';

import Signature from '../../lib/Signature';

class SignatureExample extends React.Component {
  constructor() {
    super();

    this.state = { show: false };
  }

  handleChange(event, lineSegments, lastSegment){
    console.log(JSON.stringify(lastSegment));
  }

  render() {
    return (      
      <div style={{ height: '100px', width: '100%', border: '1px solid black'}} >
        <Signature ref={instance => { this.signature = instance; }} lineColor={'#00008B'} onChange={this.handleChange.bind(this)}/>
        <button onClick={() => {this.signature.clearSignature()}}>Clear</button>
      </div>
    );
  }
}

export default SignatureExample;

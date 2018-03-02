import React, {Component} from 'react';
import { connect } from 'react-redux';

class CreateWalletPage extends Component {

  render() {

    return (
      <div>

        <h1>Create Wallet</h1>
        <h2>{this.props.myValue}</h2>
      </div>
    );
  }
}

const mapStateToProps = function(state){
  return {
    myValue: state.myValue
  };
};

export default connect(mapStateToProps)(CreateWalletPage)
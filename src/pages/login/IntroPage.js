import React, {Component} from 'react';
import {Link} from "react-router-dom";
import simpleContract from "../../services/ReviewsContractService";

class IntroPage extends Component {

  onClickOfCreateWallet(event) {
    alert(simpleContract.getValue());
  }

  onClickOfImportWallet(event) {

  }

  render() {

    const buttonStyle = {

      width: "50%",
      height: "200px",
      display: "table-cell",
      verticalAlign: "middle"
    };

    return (

      <div align="center">
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <Link to="/createWallet">
          <button style={buttonStyle} onClick={this.onClickOfCreateWallet.bind(this)}>create wallet</button>
        </Link>
        <br/>
        <br/>
        <Link to="/importWallet">
          <button style={buttonStyle} onClick={this.onClickOfImportWallet.bind(this)}>import wallet</button>
        </Link>
      </div>
    );
  }
}

export default IntroPage;
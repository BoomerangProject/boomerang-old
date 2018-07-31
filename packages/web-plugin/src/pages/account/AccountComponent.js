import React, { Component } from 'react';

class AccountComponent extends Component {

  render() {

    return (
      <div className="Account container">

        <img alt="" className="Account logo" src={require("../../images/boomerang.png")}/>
        <h1>Account</h1>

        <div className="Account address">
          {"0x" + localStorage.getItem("boomerangAddress")}
        </div>
      </div>
    );
  }
}

export default AccountComponent;

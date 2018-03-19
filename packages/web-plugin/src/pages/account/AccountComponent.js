import React, { Component } from 'react';

class AccountComponent extends Component {

  render() {

    return (
      <div className="Account container">

        <img alt="" className="Account logo" src={require("../../images/kudos.png")}/>
        <h1>Account</h1>

        <div className="Account Address">
          {"0x" + localStorage.getItem("kudosAddress")}
        </div>
      </div>
    );
  }
}

export default AccountComponent;

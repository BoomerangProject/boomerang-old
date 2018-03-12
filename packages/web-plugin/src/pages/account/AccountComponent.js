import React, { Component } from 'react';

class AccountComponent extends Component {

  render() {

    return (
      <div className="Account container">
        <h1>Account</h1>
        <img alt="" className="Account logo" src={require("../../images/kudos.png")}/>
      </div>
    );
  }
}

export default AccountComponent;

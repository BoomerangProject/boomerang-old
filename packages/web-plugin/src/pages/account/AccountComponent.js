import React, { Component } from 'react';

class AccountComponent extends Component {

  onClickOfButton() {

    if (document.isVisible()) {
      document.hide();
    } else {
      document.show();
    }
  }

  render() {

    return (
      <div className="Account container">

        <img alt="" className="Account logo" src={require("../../images/kudos.png")}/>
        <h1>Account</h1>

        <div className="Account accountAddress">
          {"0x" + localStorage.getItem("kudosAccountAddress")}
        </div>

        <button style={{width: "100px", height: "100px"}} onClick={this.onClickOfButton.bind(this)}>click</button>
      </div>
    );
  }
}

export default AccountComponent;

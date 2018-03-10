import React, { Component } from 'react';
import crypto from 'crypto';

class CreateAccountComponent extends Component {

  onClickOfTheButton() {

    const privateKey = crypto.randomBytes(32);
    window.alert(privateKey.toString("hex"));
  }

  render() {

    return (
      <div className="CreateAccount container">
        <h3>create account</h3>

        <button className="CreateAccount button" onClick={this.onClickOfTheButton.bind(this)}>click me</button>
      </div>
    );
  }
}

export default CreateAccountComponent;

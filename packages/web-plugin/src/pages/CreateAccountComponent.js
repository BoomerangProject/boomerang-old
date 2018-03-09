import React, { Component } from 'react';
import crypto from 'crypto';
import mainDivStyle from "../styles/MainDivStyle";
import buttonStyle from "../styles/ButtonStyle";

class CreateAccountComponent extends Component {

  onClickOfTheButton() {

    const privateKey = crypto.randomBytes(32);
    window.alert(privateKey.toString("hex"));
  }

  render() {

    return (
      <div style={mainDivStyle}>
        <h3>create account</h3>



        <button style={buttonStyle} onClick={this.onClickOfTheButton.bind(this)}>click me</button>
      </div>
    );
  }
}

export default CreateAccountComponent;

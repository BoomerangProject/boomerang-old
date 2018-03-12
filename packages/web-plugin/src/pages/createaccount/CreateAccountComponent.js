import React, { Component } from 'react';
import crypto from 'crypto';
import { copyTextToClipboard } from "../../util";

class CreateAccountComponent extends Component {

  constructor(props) {
    super(props);
    this.privateKey = crypto.randomBytes(32).toString("hex");
  }

  onClickOfSeedButton() {
    copyTextToClipboard(this.privateKey);
  }

  onClickOfConfirmButton() {
    localStorage.setItem("kudosAccountSeed", this.privateKey);
    this.props.history.push("/account");
  }

  render() {

    return (
      <div className="CreateAccount container">

        <img alt="" className="CreateAccount logo" src={require("../../images/kudos.png")}/>

        <h5 className="CreateAccount title">Your Kudos Account Seed</h5>

        <div className="CreateAccount firstParagraph">Your Kudos Account Seed is how we generate your account. It's also how you log into the iOS and Android apps.</div>

        <div className="CreateAccount warningMessage">If you lose your Account Seed, your funds cannot be recovered.</div>

        <div className="CreateAccount secondParagraph">Keep your Account Seed somewhere safe (like 1Password, LastPass, or print it out and put it in a safe) and <span className="CreateAccount secondParagraphRedText">never give it to anyone, ever.</span></div>

        <button className="CreateAccount seedButton" id="seedButton" onClick={this.onClickOfSeedButton.bind(this)}>{this.privateKey}</button>

        <div className="CreateAccount tapToCopyMessage">Tap to copy</div>

        <button className="CreateAccount button" onClick={this.onClickOfConfirmButton.bind(this)}>I Understand, Continue</button>
      </div>
    );
  }
}

export default CreateAccountComponent;

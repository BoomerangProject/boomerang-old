import React, { Component } from 'react';
import { Clipboard } from 'react-native';

class CreateAccountComponent extends Component {

  constructor(props) {
    super(props);
    // this.privateKey = crypto.randomBytes(32).toString("hex");
    this.privateKey = "this is not a private key"
  }

  async onClickOfSeedButton() {
    await Clipboard.setString(this.privateKey);
  }

  onClickOfConfirmButton() {
    localStorage.setItem("kudosAccountSeed", this.privateKey);
    // localStorage.setItem("kudosAddress", ethUtil.privateToAddress(new Buffer(this.privateKey, "hex")).toString("hex"));
    this.props.history.push("/account");
  }

  render() {

    return (
      <View className="CreateAccount container">

        <img alt="" className="CreateAccount logo" src={require("../../images/kudos.png")}/>

        <h5 className="CreateAccount title">Your Kudos Account Seed</h5>

        <Text className="CreateAccount firstParagraph">Your Kudos Account Seed is how we generate your account. It's also how you log into the iOS and Android apps.</div>

        <Text className="CreateAccount warningMessage">If you lose your Account Seed, your funds cannot be recovered.</Text>

        <Text className="CreateAccount secondParagraph">Keep your Account Seed somewhere safe (like 1Password, LastPass, or print it out and put it in a safe) and <span className="CreateAccount secondParagraphRedText">never give it to anyone, ever.</span></Text>

        <button className="CreateAccount seedButton" id="seedButton" onClick={this.onClickOfSeedButton.bind(this)}>{this.privateKey}</button>

        <div className="CreateAccount tapToCopyMessage">Tap to copy</div>

        <button className="CreateAccount button" onClick={this.onClickOfConfirmButton.bind(this)}>I Understand, Continue</button>
      </View>
    );
  }
}

export default CreateAccountComponent;

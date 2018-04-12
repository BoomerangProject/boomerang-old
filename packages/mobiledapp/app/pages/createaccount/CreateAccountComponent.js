import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, ToastAndroid, Clipboard } from 'react-native';
import crypto from 'crypto'
import styles from './CreateAccountComponentStyle';
import ethUtil from "ethereumjs-util";

class CreateAccountComponent extends Component {

  constructor(props) {
    super(props);
    this.privateKey = crypto.randomBytes(32).toString("hex");
    // ToastAndroid.show(this.privateKey, ToastAndroid.SHORT);
  }

  async onClickOfSeedButton() {
    await Clipboard.setString(this.privateKey);
  }

  onClickOfConfirmButton() {
    ToastAndroid.show(ethUtil.privateToAddress(new Buffer(this.privateKey, "hex")).toString("hex"), ToastAndroid.SHORT);
    // localStorage.setItem("kudosAccountSeed", this.privateKey);
    // localStorage.setItem("kudosAddress", ethUtil.privateToAddress(new Buffer(this.privateKey, "hex")).toString("hex"));
    // this.props.history.push("/account");
  }

  render() {

    return (
      <View style={styles.container}>

        <Image style={styles.logo} source={require("../../images/kudos.png")}/>

        <Text style={styles.title}>Your Kudos Account Seed</Text>

        <Text style={styles.firstParagraph}>Your Kudos Account Seed is how we generate your account. It's also how you log into the iOS and Android apps.</Text>

        <Text style={styles.warningMessage}>If you lose your Account Seed, your funds cannot be recovered.</Text>

        <Text style={styles.secondParagraph}>Keep your Account Seed somewhere safe (like 1Password, LastPass, or print it out and put it in a safe) and <Text style={styles.secondParagraphRedText}>never give it to anyone, ever.</Text></Text>

        <TouchableOpacity
          style={styles.seedButtonContainer}
          onPress={this.onClickOfSeedButton.bind(this)}>
          <Text style={styles.seedButton}>{this.privateKey}</Text>
        </TouchableOpacity>

        <Text style={styles.tapToCopyMessage}>Tap to copy</Text>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.onClickOfConfirmButton.bind(this)}>
          <Text style={styles.button}>I Understand, Continue</Text>
        </TouchableOpacity>
     </View>
    );
  }
}

export default CreateAccountComponent;

import React, { Component } from 'react';
import { Clipboard, Image, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import crypto from 'crypto'
import styles from './CreateAccountComponentStyle';
import { storeSeed } from '../../../services/LocalStorageService';
import Navigator from '../../../util/Navigator';

export default class CreateAccountComponent extends Component {

  constructor(props) {
    super(props);
    this.boomerangAccountSeed = crypto.randomBytes(32).toString('hex');
  }

  async onClickOfSeedButton() {
    await Clipboard.setString(this.boomerangAccountSeed);
  }

  async onClickOfConfirmButton() {
    await storeSeed(this.boomerangAccountSeed);
    Navigator.init(this).pushAccountTypeSelectionPage();
  }

  render() {

    return (
      <View style={styles.container}>

        <Image style={styles.logo} source={require('../../../../assets/images/boomerang.png')}/>

        <Text style={styles.title}>Your Boomerang Account Seed</Text>

        <Text style={styles.firstParagraph}>Your Boomerang Account Seed is how we generate your account. It's also how you
          log into the iOS and Android apps.</Text>

        <Text style={styles.warningMessage}>If you lose your Account Seed, your funds cannot be recovered.</Text>

        <Text style={styles.secondParagraph}>Keep your Account Seed somewhere safe (like 1Password, LastPass, or print
          it out and put it in a safe) and <Text style={styles.secondParagraphRedText}>never give it to anyone,
            ever.</Text></Text>

        <TouchableOpacity
          style={styles.seedButtonContainer}
          onPress={this.onClickOfSeedButton.bind(this)}>
          <Text style={styles.seedButton}>{this.boomerangAccountSeed}</Text>
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

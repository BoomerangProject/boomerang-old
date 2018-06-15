import React, { Component } from 'react';
import styles from './ImportAccountComponentStyle';
import { KeyboardAvoidingView, View, Image, Text, TouchableOpacity, TextInput, ToastAndroid, Alert } from 'react-native';
import { storeSeed } from '../../../services/LocalStorageService';
import Navigator from '../../../util/Navigator';

import ActivityIndicatorButtonComponent from "../../../views/activityindicatorbutton/ActivityIndicatorButtonComponent";

export default class ImportAccountComponent extends Component {

  constructor(args) {
    super(args);
    this.state = {seedText: '', showActivityIndicator: false};
  }

  onChangeOfSeedText(seedTextValue) {
    this.setState({seedText: seedTextValue});
  }

  showActivityIndicator() {
    this.setState({showActivityIndicator: true});
  }

  hideActivityIndicator() {
    this.setState({showActivityIndicator: false});
  }

  async onClickOfConfirmButton() {

    this.showActivityIndicator();

    if (this.state.seedText == undefined || this.state.seedText.length !== 64) {

      Alert.alert('Invalid seed', 'seed text must be 64 hexadecimal characters',
        [{text: 'OK', onPress: () => {}}],
        { cancelable: false }
      );

      this.hideActivityIndicator();
      return;
    }

    const kudosAccountAddress = await storeSeed(this.state.seedText);
    await Navigator.init(this).goToAccountPage(kudosAccountAddress);
    this.hideActivityIndicator();
  }

  render() {

    return (

      <KeyboardAvoidingView behavior='height' style={styles.container}>

        <Image style={styles.logo} source={require('../../../../assets/images/kudos.png')}/>

        <Text style={styles.title}>Paste a seed to begin</Text>

          <Text style={styles.seedLabel}>SEED</Text>

          <View style={styles.seedTextContainer}>
            <TextInput style={styles.seedText}
                       maxLength={64}
                       underlineColorAndroid={'transparent'}
                       multiline={true}
                       onChangeText={this.onChangeOfSeedText.bind(this)}/>
          </View>

        <ActivityIndicatorButtonComponent
          showActivityIndicator={this.state.showActivityIndicator}
          onClick={this.onClickOfConfirmButton.bind(this)}
        />

      </KeyboardAvoidingView>
    );
  }
}

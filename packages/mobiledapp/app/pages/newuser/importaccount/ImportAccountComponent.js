import React, { Component } from 'react';
import styles from './ImportAccountComponentStyle';
import { KeyboardAvoidingView, View, Image, Text, TouchableOpacity, TextInput, ToastAndroid, Alert } from 'react-native';
import { storeSeed } from '../../../services/LocalStorageService';
import Navigator from '../../../util/Navigator';
import IsUserRequester from "../../../api/read/IsUserRequester";
import IsWorkerRequester from "../../../api/read/IsWorkerRequester";
import IsBusinessRequester from "../../../api/read/IsBusinessRequester";

export default class ImportAccountComponent extends Component {

  constructor(args) {
    super(args);
    this.state = {seedText: ''};
  }

  onChangeOfSeedText(seedTextValue) {
    this.setState({seedText: seedTextValue});
  }

  async onClickOfConfirmButton() {

    if (this.state.seedText == undefined || this.state.seedText.length !== 64) {

      Alert.alert('Invalid seed', 'seed text must be 64 hexadecimal characters',
        [{text: 'OK', onPress: () => {}}],
        { cancelable: false }
      );

      return;
    }

    const kudosAccountAddress = await storeSeed(this.state.seedText);

    this.isUserRequester = new IsUserRequester(kudosAccountAddress);
    this.isWorkerRequester = new IsWorkerRequester(kudosAccountAddress);
    this.isBusinessRequester = new IsBusinessRequester(kudosAccountAddress);


    const isUser = this.isUserRequester.makeRequest();
    const isWorker = this.isWorkerRequester.makeRequest();
    const isBusiness = this.isBusinessRequester.makeRequest();

    ToastAndroid.show(isUser.toString() + '\n' + isWorker.toString() + '\n' + isBusiness.toString(), ToastAndroid.SHORT);

    // Navigator.init(this).resetToBusinessEmployeesPage();
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

          <TouchableOpacity
            style={styles.importAccountButtonContainer}
            onPress={this.onClickOfConfirmButton.bind(this)}>
            <Text style={styles.importAccountButton}>Confirm Seed</Text>
          </TouchableOpacity>

      </KeyboardAvoidingView>
    );
  }
}

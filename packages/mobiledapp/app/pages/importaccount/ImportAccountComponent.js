import React, { Component } from 'react';
import styles from './ImportAccountComponentStyle';
import { KeyboardAvoidingView, View, Image, Text, TouchableOpacity, TextInput, ToastAndroid, Alert } from "react-native";
import { storeSeed } from "../../services/LocalStorageService";

class ImportAccountComponent extends Component {


  constructor(args) {
    super(args);
    this.state = {seedText: ''};
  }

  onChangeOfSeedText(seedTextValue) {
    // ToastAndroid.show(seedText, ToastAndroid.SHORT);
    this.setState({seedText: seedTextValue});
  }

  onClickOfConfirmButton() {

    if (this.state.seedText === null || this.state.seedText.length !== 64) {

      Alert.alert('Invalid seed', 'seed text must be 64 hexadecimal characters',
        [{text: 'OK', onPress: () => {}}],
        { cancelable: false }
      );

      return;
    }

    storeSeed(this.kudosAccountSeed);

    this.props.navigator.push({
      screen: 'LoadingPageComponent',
      navigatorStyle: {
        navBarHidden: true
      }
    });
  }

  render() {

    return (

      <KeyboardAvoidingView behavior='height' style={styles.container}>

        <Image style={styles.logo} source={require("../../images/kudos.png")}/>

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

export default ImportAccountComponent;

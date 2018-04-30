import React, { Component } from 'react';
import styles from './ImportAccountComponentStyle';
import { KeyboardAvoidingView, View, Image, Text, TouchableOpacity, TextInput, ToastAndroid } from "react-native";

class ImportAccountComponent extends Component {

  static navigationOptions = {
    header: null
  };

  onChangeOfSeedText(seedTextValue) {
    // ToastAndroid.show(seedText, ToastAndroid.SHORT);
    this.setState({seedText: seedTextValue});
  }

  onClickOfConfirmButton() {

    // if (this.state.seedText === null || this.state.seedText.length !== 64) {
    //   window.alert("seed text must be 64 hexadecimal characters");
    //   return;
    // }
    //
    // localStorage.setItem("kudosAccountSeed", this.state.seedText);
    // localStorage.setItem("kudosAddress", ethUtil.privateToAddress(new Buffer(this.state.seedText, "hex")).toString("hex"));
    this.props.navigation.navigate('AccountComponent');
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

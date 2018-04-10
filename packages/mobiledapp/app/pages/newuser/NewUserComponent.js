import React, { Component } from 'react';
import styles from './NewUserComponentStyle';
import { Image, Text, View, TouchableOpacity } from "react-native";
import CreateAccountComponent from "../createaccount/CreateAccountComponent";
import ImportAccountComponent from "../importaccount/ImportAccountComponent";

class NewUserComponent extends Component {

  onClickOfCreateAccountButton() {
    this.props.navigation.navigate('CreateAccountComponent');
  }

  onClickOfImportAccountButton() {
    this.props.navigation.navigate('ImportAccountComponent');
  }

  render() {

    return (

      <View style={styles.container}>

        <Image style={styles.logo} source={require("../../images/kudos.png")}/>
        <Text style={styles.welcomeMessage}>Welcome to Kudos</Text>

        <TouchableOpacity
          style={styles.createAccountButtonContainer}
          onPress={this.onClickOfCreateAccountButton.bind(this)}>
          <Text style={styles.createAccountButton}>Start a new account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.importAccountButtonContainer}
          onPress={this.onClickOfImportAccountButton.bind(this)}>
          <Text style={styles.importAccountButton}>I already have an account</Text>
        </TouchableOpacity>

        <Text style={styles.version}>K U D O S - v 1 . 0</Text>

      </View>
    );
  }
}

export default NewUserComponent;

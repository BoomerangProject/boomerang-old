import React, { Component } from 'react';
import { View, Image, TextInput, Text, TouchableOpacity, ToastAndroid, Clipboard } from 'react-native';
import styles from './CreateBusinessAccountComponentStyle';
import { default as localStorage } from 'react-native-sensitive-info';
import Navigator from "../../../util/Navigator";
import RegisterAsBusinessRequester from "../../../api/write/RegisterAsBusinessRequester";

class CreateBusinessAccountComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {businessName: '', businessDescription: ''};
    this.okayButtonIsEnabled = false;
  }

  componentWillUpdate(nextProps, nextState) {

    if (nextState.businessName.length > 0 && nextState.businessDescription.length > 0) {
      this.okayButtonIsEnabled = true;
    } else {
      this.okayButtonIsEnabled = false;
    }
  }

  async onClickOfOkayButton() {

    if (this.okayButtonIsEnabled) {

      const businessAccountAddress = await localStorage.getItem('kudosAccountAddress', {
        keychainService: 'kudosKeychain'
      });

      const businessName = this.state.businessName;
      const businessDescription = this.state.businessDescription;
      const registerAsBusinessRequester = new RegisterAsBusinessRequester(businessAccountAddress, businessName, businessDescription);

      const props = {
        requester: registerAsBusinessRequester,
        loadingMessage: 'Creating Account',
        onSuccess: this.onSuccess.bind(this),
        onFailure: this.onFailure.bind(this)
      };

      Navigator.init(this).goToLoadingPage(props);
    }
  }

  onSuccess(transactionHash) {
    console.log('transactionHash: ' + transactionHash);

    const props = {
      businessName: this.state.businessName,
      businessDescription: this.state.businessDescription
    };

    Navigator.init(this).resetToBusinessEmployeesPage(props);
  }

  onFailure(error) {
    ToastAndroid.show('we have failure: ' + error.message, ToastAndroid.SHORT);


    // if (!error.message.toLowerCase().includes('abort')) {
    //   // TODO - display some kind of error message
    //   console.log(error);
    // }
  }

  okayButton() {

    if (this.okayButtonIsEnabled) {
      return (
        <TouchableOpacity
          style={styles.okayButtonContainer}
          onPress={this.onClickOfOkayButton.bind(this)}>
          <Text style={styles.okayButton}>ok</Text>
        </TouchableOpacity>
      );
    }
  }

  render() {

    return (
      <View style={styles.container}>

        <View style={{flex: 1}}/>

        <Image style={styles.logo} source={require("../../../../assets/images/kudos.png")}/>

        <Text style={styles.title}>Create Kudos Business</Text>

        <View style={{flex: 1}}/>

        <TextInput style={styles.businessNameTextInput}
                   placeholder="name"
                   onChangeText={(businessName) => this.setState({businessName})}/>

        <TextInput style={styles.businessDescriptionTextInput}
                   placeholder="description"
                   onChangeText={(businessDescription) => this.setState({businessDescription})}/>

        <View style={{flex: 2}}/>

        {this.okayButton()}
      </View>
    );
  }
}

export default CreateBusinessAccountComponent;

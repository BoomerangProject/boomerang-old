import React, { Component } from 'react';
import { View, Image, TextInput, Text, TouchableOpacity, ToastAndroid, Clipboard } from 'react-native';
import styles from './CreateBusinessAccountComponentStyle';
import { default as localStorage } from 'react-native-sensitive-info';

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

      const accountAddress = await localStorage.getItem('kudosAccountAddress', {
        keychainService: 'kudosKeychain'
      });

      console.log("business account address: " + accountAddress);
      console.log("business name: " + this.state.businessName);
      console.log("business description: " + this.state.businessDescription);

      // this.props.navigator.push({
      //   screen: 'AddProfilePhotoComponent',
      //   navigatorStyle: {
      //     navBarHidden: true
      //   }
      // });
    }
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

        <Image style={styles.logo} source={require("../../images/kudos.png")}/>

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

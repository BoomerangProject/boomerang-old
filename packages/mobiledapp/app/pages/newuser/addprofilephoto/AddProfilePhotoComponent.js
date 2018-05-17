import React, { Component } from 'react';
import { View, Image, TextInput, Text, TouchableOpacity, ToastAndroid, Clipboard } from 'react-native';
import styles from './AddProfilePhotoComponentStyle';
import Icon from 'react-native-vector-icons/FontAwesome';

class AddProfilePhotoComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {photoUrl: '', buttonText: 'skip'};
  }

  componentWillUpdate(nextProps, nextState) {

    if (nextState.photoUrl.length > 0) {
      this.okayButtonIsEnabled = true;
    } else {
      this.okayButtonIsEnabled = false;
    }
  }

  onClickOfAddProfileButton() {
    this.setState({photoUrl: 'nicccceeeee.com'});
  }

  onClickOfButton() {

  }

  render() {

    return (
      <View style={styles.container}>

        <View style={{flex: 1}}/>

        <Image style={styles.logo} source={require("../../../../assets/images/kudos.png")}/>

        <Text style={styles.title}>Add Profile Photo</Text>

        <View style={{flex: 1}}/>

        <TouchableOpacity>
          <View
            style={styles.addProfilePhotoButton}
            onPress={this.onClickOfAddProfileButton.bind(this)}>
            <Icon name={'plus-circle'} size={70} color="#5DD0C2"/>
          </View>
        </TouchableOpacity>

        <View style={{flex: 2}}/>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.onClickOfButton.bind(this)}>
          <Text style={styles.button}>{this.state.buttonText}</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

export default AddProfilePhotoComponent;

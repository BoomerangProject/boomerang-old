import React, { Component } from 'react';
import { Text, ToastAndroid, View, Slider, Image, TouchableOpacity } from 'react-native';
import styles from './DefineWorkerRewardColorSchemeComponentStyle';
import Navigator from '../../../../../util/Navigator';
import ActivityIndicatorButtonComponent from '../../../../../views/activityindicatorbutton/ActivityIndicatorButtonComponent';

export default class DefineWorkerRewardColorSchemeComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {showActivityIndicator: false};
  }

  showActivityIndicator() {
    this.setState({showActivityIndicator: true});
  }

  hideActivityIndicator() {
    this.setState({showActivityIndicator: false});
  }

  async onClickOfSubmitButton() {
    this.showActivityIndicator();

    // await the thing

    this.hideActivityIndicator();
  }

  render() {

    return (

      <View style={styles.container}>

        <Text>color scheme</Text>

        <View style={{flex:1}}/>

        <ActivityIndicatorButtonComponent
          buttonText='submit'
          showActivityIndicator={this.state.showActivityIndicator}
          onClick={this.onClickOfSubmitButton.bind(this)}
        />

      </View>
    );
  }
}

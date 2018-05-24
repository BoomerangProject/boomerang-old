import React, { Component } from 'react';
import { View, Button, Image, Text, ToastAndroid } from "react-native";
import styles from './BusinessEmployeesComponentStyle';

class BusinessEmployeesComponent extends Component {

  constructor(props) {
    super(props);

    this.navigatorButtons = {
      rightButtons: [
        {
          id: 'transactions',
          component: 'TransactionLoadingButtonComponent',
          passProps: {
            navigator: this.props.navigator,
          }
        }
      ]
    };

    this.props.navigator.setButtons(this.navigatorButtons);
  }

  visible = true;
  onClickOfShowHideButton() {

    if (this.visible) {
      this.props.navigator.setButtons({rightButtons:[]});
    } else {
      this.props.navigator.setButtons(this.navigatorButtons);
    }

    this.visible = !this.visible;
  }

  onClickOfAddEmployeeButton() {

  }

  render() {

    return (

      <View style={styles.container}>

        <View style={{flex:1}}/>

        <Button
          onPress={this.onClickOfAddEmployeeButton.bind(this)}
          title="add employee"
        />

        <View style={{flex:1}}/>

        <Button
          onPress={this.onClickOfShowHideButton.bind(this)}
          title="show/hide"
        />

        <View style={{flex:1}}/>

        <View style={{flex:1}}/>


      </View>
    );
  }
}

export default BusinessEmployeesComponent;

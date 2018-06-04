import React, { Component } from 'react';
import styles from './EmployeeListItemComponentStyle';
import { View, TouchableHighlight, Text, ToastAndroid } from "react-native";

class EmployeeListItemComponent extends Component {

  constructor(props) {
    super(props);
    this.item = this.props.item;
  }

  onClick() {

    ToastAndroid.show('employee tile clicked', ToastAndroid.SHORT);
  }

  render() {

    return (

      <View style={this.item.key === 'item1' ? [styles.container, {paddingTop: 1}] : styles.container}>

        <TouchableHighlight
          style={{width: '100%'}}
          underlayColor='#FAFAFA'
          onPress={this.onClick.bind(this)}>

          <Text>{this.item.employeeName}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default EmployeeListItemComponent;

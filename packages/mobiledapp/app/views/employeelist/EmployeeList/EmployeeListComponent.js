import React, { Component } from 'react';
import styles from './EmployeeListComponentStyle';
import EmployeeListItemComponent from '../EmployeeListItem/EmployeeListItemComponent';
import { View, FlatList, ListItem, TouchableHighlight, Text, ToastAndroid } from "react-native";

class EmployeeListComponent extends Component {

  render() {

    return (

      <View style={styles.container}>

        <View style={styles.header}/>

        <FlatList
          style={styles.flatListStyle}
          data={[]}
          renderItem={({item}) => <EmployeeListItemComponent.js item={item} navigator={this.props.navigator}/>}/>
      </View>
    );
  }
}

export default EmployeeListComponent;

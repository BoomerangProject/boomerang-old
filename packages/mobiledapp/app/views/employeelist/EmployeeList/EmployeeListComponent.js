import React, { Component } from 'react';
import styles from './EmployeeListComponentStyle';
import EmployeeListItemComponent from '../EmployeeListItem/EmployeeListItemComponent';
import { View, FlatList, ListItem, TouchableHighlight, Text, ToastAndroid } from "react-native";
import Navigator from "../../../util/Navigator";

class EmployeeListComponent extends Component {

  onClickOfAddEmployeeButton() {
    Navigator.init(this).goToAddEmployeePage();
  }

  render() {

    const data = [
      {key: 'item1', employeeName: 'billy'},
      {key: 'item2', employeeName: 'hailee'},
      {key: 'item3', employeeName: 'emily'},
      {key: 'item4', employeeName: 'pete'},
      {key: 'item5', employeeName: 'jonnie'},
      {key: 'item6', employeeName: 'shhteven'}
    ];

    return (

      <View style={styles.container}>

        <View style={styles.innerContainer}>

          <View style={styles.header}/>

          <FlatList
            style={styles.flatListStyle}
            data={data}
            renderItem={({item}) => <EmployeeListItemComponent item={item} navigator={this.props.navigator}/>}/>

          <TouchableHighlight
            style={styles.buttonContainer}
            underlayColor='#FAFAFA'
            onPress={this.onClickOfAddEmployeeButton.bind(this)}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableHighlight>

        </View>
      </View>
    );
  }
}

export default EmployeeListComponent;

import React, { Component } from 'react';
import styles from './BusinessListComponentStyle';
import ReviewListItem from '../BusinessListItem/BusinessListItemComponent';
import { View, FlatList, ListItem, TouchableHighlight, Text, ToastAndroid } from "react-native";
import businessListData from '../../../mockdata/MockBusinessList';

class ReviewsListComponent extends Component {

  render() {

    return (

      <View style={styles.container}>

        <View style={styles.header}/>

        <FlatList
          style={styles.flatListStyle}
          data={businessListData}
          renderItem={({item}) => <ReviewListItem item={item} navigator={this.props.navigator}/>}/>
      </View>
    );
  }
}

export default ReviewsListComponent;

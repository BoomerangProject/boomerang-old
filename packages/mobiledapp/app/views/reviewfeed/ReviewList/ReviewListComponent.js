import React, { Component } from 'react';
import styles from './ReviewListComponentStyle';
import ReviewListItem from '../ReviewListItem/ReviewListItemComponent';
import { View, FlatList, ListItem, TouchableHighlight, Text, ToastAndroid } from "react-native";
import reviewFeedData from '../../../mockdata/MockReviewFeed';

class ReviewListComponent extends Component {

  render() {

    return (

      <View style={styles.container}>

        <View style={styles.header}/>

        <FlatList
          style={styles.flatListStyle}
          data={reviewFeedData}
          renderItem={({item}) => <ReviewListItem item={item} navigator={this.props.navigator}/>}/>
      </View>
    );
  }
}

export default ReviewListComponent;

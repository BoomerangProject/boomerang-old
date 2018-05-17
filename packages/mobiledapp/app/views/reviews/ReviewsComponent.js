import React, { Component } from 'react';
import styles from './ReviewsComponentStyle';
import { View, TouchableHighlight, Text, ToastAndroid } from "react-native";

class ReviewsComponent extends Component {

  onClickOfBalance() {
    ToastAndroid.show('balance', ToastAndroid.SHORT);
  }

  render() {

    return (

      <View style={styles.container}>

        <Text>reviews</Text>
      </View>
    );
  }
}

export default ReviewsComponent;

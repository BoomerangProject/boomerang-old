import React, { Component } from 'react';
import { View, Image, Text, ToastAndroid } from "react-native";
import styles from './BusinessProfileComponentStyle';
import ReviewListComponent from "../../../views/reviewfeed/ReviewList/ReviewListComponent";

class BusinessProfileComponent extends Component {

  constructor(args) {
    super(args);
    this.item = this.props.item;
  }

  render() {

    return (

      <View style={styles.container}>

        <View style={styles.businessInfoContainer}>
          <Text style={styles.businessName}>{this.item.businessName}</Text>
          <Text style={styles.businessDescription}>{this.item.businessDescription}</Text>
        </View>

        <ReviewListComponent />
      </View>
    );
  }
}

export default BusinessProfileComponent;

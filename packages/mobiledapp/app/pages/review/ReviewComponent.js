import React, { Component } from 'react';
import { View, Image, Text, ToastAndroid } from "react-native";
import styles from './ReviewComponentStyle';

class ReviewComponent extends Component {

  constructor(args) {
    super(args);
    const { params } = this.props.navigation.state;
    this.reviewEvent = params.reviewEvent;
  }

  async componentDidMount() {
    // ToastAndroid.show(this.reviewEvent.ipfsHash.toString(), ToastAndroid.SHORT);
    const review = await this.getReview(this.reviewEvent.ipfsHash);
    this.setState({review});
  }

  render() {

    return (

      <View style={styles.container}>
        <Text>{JSON.stringify(this.state.review)}</Text>
      </View>
    );
  }
}

export default ReviewComponent;

import React, { Component } from 'react';
import { View, Image, Text, FlatList, ToastAndroid } from "react-native";
import styles from './ReviewComponentStyle';

import axios from 'axios';
axios.defaults.baseURL = 'http://ec2-54-172-136-192.compute-1.amazonaws.com:8080';

class ReviewComponent extends Component {

  constructor(args) {
    super(args);
    const { params } = this.props.navigation.state;
    this.reviewEvent = params.reviewEvent;
    this.state = {review: ""}
  }

  async componentDidMount() {
    // ToastAndroid.show(this.reviewEvent.ipfsHash.toString(), ToastAndroid.SHORT);
    const review = await this.getReview(this.reviewEvent.ipfsHash);
    this.setState({review});
  }

  async getReview(ipfsHash) {

    return new Promise(function(resolve, reject) {

      return axios.get(`/ipfs/${ipfsHash}`)
        .then(function (response) {
        return resolve(response.data);
      }).catch(function (error) {
        return reject(error);
      });
    });
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

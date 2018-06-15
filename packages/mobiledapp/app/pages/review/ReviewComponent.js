import React, { Component } from 'react';
import { View, Image, Text, ScrollView, ToastAndroid } from 'react-native';
import styles from './ReviewComponentStyle';
import IpfsFileRequesterOld from '../../api/IpfsFileRequesterOld';
import prettyPrint from '../../util/PrettyPrinter';

export default class ReviewComponent extends Component {

  constructor(args) {
    super(args);
    this.item = this.props.item;
    this.state = {reviewInformation: ''};
    this.ipfsFileRequester = new IpfsFileRequesterOld();
  }

  async componentDidMount() {

    const reviewInformation = await this.ipfsFileRequester.makeRequest(this.item.ipfsHash);
    console.log('reviewInformation: ' + JSON.stringify(reviewInformation, null, 2));

    this.setState({reviewInformation});
  }

  render() {

    return (

      <View style={styles.container}>

        <ScrollView>
          <View style={styles.fieldContainer}>
            <Text style={styles.field}>user: {this.item.userAddress}</Text>
            <Text style={styles.field}>worker: {this.item.workerAddress}</Text>
            <Text style={styles.field}>business: {this.item.businessAddress}</Text>
            <Text style={styles.field}>ipfsHash: {this.item.ipfsHash}</Text>
          </View>

          <Text style={styles.reviewInformation}>{prettyPrint(this.state.reviewInformation)}</Text>
        </ScrollView>
      </View>
    );
  }
}

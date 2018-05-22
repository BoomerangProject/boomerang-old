import React, { Component } from 'react';
import styles from './ReviewListItemComponentStyle';
import { View, TouchableHighlight, Text, ToastAndroid } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

class ReviewListItemComponent extends Component {

  constructor(props) {
    super(props);
    this.item = this.props.item;
  }

  onClick() {
    ToastAndroid.show('tile click', ToastAndroid.SHORT);
  }

  render() {

    return (

      <View style={this.item.key === 'item1' ? [styles.container, {paddingTop: 1}] : styles.container}>

        <TouchableHighlight
          underlayColor='#FAFAFA'
          style={styles.itemTile}
          onPress={this.onClick.bind(this)}>

          {this.item.reviewer === 'user' ? this.userReview() : this.workerReview()}

        </TouchableHighlight>
      </View>
    );
  }

  userReview() {

    return (<View style={{flexDirection: 'column', width: '100%'}}>

      <View style={styles.leftContainer}>
        <Text style={styles.userAddress}>{this.item.userAddress}</Text>
      </View>

      <View style={styles.middleContainer}>
        <Text style={styles.rating}>{this.item.rating}</Text>
        <Icon name="long-arrow-right" size={14} color="#002A1C"/>
      </View>

      <View style={styles.rightContainer}>
        <Text style={styles.workerAddress}>{this.item.workerAddress}</Text>
        <Text style={styles.businessAddress}>{this.item.businessAddress}</Text>
      </View>
    </View>);
  }

  workerReview() {
    return (<View style={{flexDirection: 'column', width: '100%'}}>

      <View style={styles.rightContainer}>
        <Text style={styles.workerAddress}>{this.item.workerAddress}</Text>
        <Text style={styles.businessAddress}>{this.item.businessAddress}</Text>
      </View>

      <View style={styles.middleContainer}>
        <Text style={styles.rating}>{this.item.rating}</Text>
        <Icon name="long-arrow-left" size={14} color="#002A1C"/>
      </View>

      <View style={styles.leftContainer}>
        <Text style={styles.userAddress}>{this.item.userAddress}</Text>
      </View>
    </View>);
  }
}

export default ReviewListItemComponent;

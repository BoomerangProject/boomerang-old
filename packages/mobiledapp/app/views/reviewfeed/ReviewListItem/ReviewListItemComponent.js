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
    this.props.navigator.push({
      screen: 'ReviewPage',
      passProps: {
        item: this.item
      }
    });
  }

  render() {

    return (

      <View style={this.item.key === 'item1' ? [styles.container, {paddingTop: 1}] : styles.container}>

        <TouchableHighlight
          style={{width: '100%'}}
          underlayColor='#FAFAFA'
          onPress={this.onClick.bind(this)}>

          {this.item.reviewer === 'user' ? this.userReview() : this.workerReview()}

        </TouchableHighlight>
      </View>
    );
  }

  userReview() {

    return (<View style={styles.itemTile}>

      <View style={styles.leftContainer}>
        <View style={[styles.borderBox, {marginLeft: 16}]}>
          <Text style={styles.userAddress}>{this.item.userAddress}</Text>
        </View>
      </View>

      <View style={styles.middleContainer}>
        <Text style={styles.rating}>{this.item.rating}</Text>
        <Icon name="long-arrow-up" size={18} color="#002A1C"/>
      </View>

      <View style={styles.rightContainer}>
        <Text style={styles.workerAddress}>{this.item.workerAddress}</Text>
        <Text style={styles.businessAddress}>{this.item.businessAddress}</Text>
      </View>
    </View>);
  }

  workerReview() {
    return (<View style={styles.itemTile}>

      <View style={styles.leftContainer}>
        <Text style={styles.userAddress}>{this.item.userAddress}</Text>
      </View>

      <View style={styles.middleContainer}>
        <Text style={styles.rating}>{this.item.rating}</Text>
        <Icon name="long-arrow-down" size={18} color="#002A1C"/>
      </View>

      <View style={styles.rightContainer}>
        <View style={[styles.borderBox, {marginRight: 16}]}>
          <Text style={styles.workerAddress}>{this.item.workerAddress}</Text>
          <Text style={styles.businessAddress}>{this.item.businessAddress}</Text>
        </View>
      </View>
    </View>);
  }
}

export default ReviewListItemComponent;

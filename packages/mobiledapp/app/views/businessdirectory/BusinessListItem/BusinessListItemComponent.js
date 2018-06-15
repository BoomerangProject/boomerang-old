import React, { Component } from 'react';
import styles from './BusinessListItemComponentStyle';
import { View, TouchableHighlight, Text, ToastAndroid } from 'react-native';

export default class BusinessListItemComponent extends Component {

  constructor(props) {
    super(props);
    this.item = this.props.item;
    this.navigator = this.props.navigator;
  }

  onClick() {

    this.props.navigator.push({
      screen: 'BusinessProfilePage',
      passProps: {
        item: this.item
      }
    });
  }

  render() {

    return (

      <View style={this.item.key === 'item1' ? [styles.container, {paddingTop: 1}] : styles.container}>

        <TouchableHighlight
          underlayColor='#FAFAFA'
          style={styles.itemTile}
          onPress={this.onClick.bind(this)}>

          <View style={{flexDirection: 'row'}}>

            <View style={styles.businessImage}/>

            <View style={styles.businessInfoContainer}>
              <Text style={styles.businessName}>{this.item.businessName}</Text>
              <Text style={styles.businessDescription}>{this.item.businessDescription}</Text>
            </View>

            <View style={{flex:1}}/>

            <View style={styles.businessRatingContainer}>
              <Text style={styles.businessRating}>{this.item.businessRating.toFixed(1)}</Text>
              <Text style={styles.numberOfBusinessRatings}>{this.item.numberOfBusinessRatings} ratings</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
import React, { Component } from 'react';
import styles from './TransactionLoadingButtonComponentStyle';
import { View, TouchableHighlight, ActivityIndicator, Text, Image, ToastAndroid, Animated, Easing } from "react-native";

class TransactionLoadingButtonComponent extends Component {

  constructor(args) {
    super(args);
  }

  componentWillMount() {
    this.offsetX = new Animated.Value(0);
  }

  componentDidMount() {
    this.moveDotToTheRight();
  }

  moveDotToTheRight() {
    this.offsetX.setValue(-10);
    Animated.timing(this.offsetX, {
      toValue: 10,
      duration: 8000,
      easing: Easing.linear
    }).start(() => this.moveDotToTheLeft());
  }

  moveDotToTheLeft() {
    this.offsetX.setValue(10);
    Animated.timing(this.offsetX, {
      toValue: -10,
      duration: 8000,
      easing: Easing.linear
    }).start(() => this.moveDotToTheRight());
  }

  onClick() {

    this.props.navigator.push({
      screen: 'TransactionsComponent'
    });
  }

  render() {

    return (

      <View style={styles.container}>

        <TouchableHighlight
          style={styles.innerContainer}
          underlayColor='#FAFAFA'
          onPress={this.onClick.bind(this)}>

          <View style={[styles.innerContainer, {paddingTop: 4}]}>
            <Image style={{width: 28, height: 22, justifyContent: 'center', alignItems: 'center'}} source={require('../../../assets/images/blockchain.png')}/>
            <Animated.View style={{transform: [{translateX: this.offsetX}]}}>
              <Text style={styles.movingDot}>■</Text>
            </Animated.View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default TransactionLoadingButtonComponent;

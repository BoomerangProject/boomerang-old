import React, { Component } from 'react';
import styles from './TransactionLoadingButtonComponentStyle';
import { DeviceEventEmitter, View, TouchableHighlight, ActivityIndicator, Text, Image, ToastAndroid, Animated, Easing } from "react-native";
import { getArrayItem } from '../../services/LocalStorageService';

class TransactionLoadingButtonComponent extends Component {

  constructor(args) {
    super(args);
    this.state = {showButton: false};
    this.offsetX = new Animated.Value(0);
    this.showOrHideButton.bind(this);
  }

  async componentDidMount() {
    this.moveDotToTheRight();

    this.setIntervalId = setInterval(async () => {

      const pendingTransactions = await getArrayItem('pendingTransactions');
      this.showOrHideButton(pendingTransactions.length)

    }, 1000);
  }


  showOrHideButton(numberOfPendingTransactions) {

    if (numberOfPendingTransactions === 0) {
      this.setState({showButton: false});
    } else {
      this.setState({showButton: true});
    }
  }


  componentWillUnmount() {
    clearInterval(this.setIntervalId);
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
      screen: 'TransactionsPage'
    });
  }

  render() {

    return (

      <View style={styles.container}>

        {this.state.showButton &&
          <TouchableHighlight
            style={styles.innerContainer}
            underlayColor='#FAFAFA'
            onPress={this.onClick.bind(this)}>

            <View style={[styles.innerContainer, {paddingTop: 4}]}>
              <Image style={{width: 28, height: 22, justifyContent: 'center', alignItems: 'center'}}
                     source={require('../../../assets/images/blockchain.png')}/>
              <Animated.View style={{transform: [{translateX: this.offsetX}]}}>
                <Text style={styles.movingDot}>■</Text>
              </Animated.View>
            </View>
          </TouchableHighlight>
        }
      </View>
    );
  }
}

export default TransactionLoadingButtonComponent;

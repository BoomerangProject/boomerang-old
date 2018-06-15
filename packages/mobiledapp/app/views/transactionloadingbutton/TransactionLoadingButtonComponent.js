import React, { Component } from 'react';
import styles from './TransactionLoadingButtonComponentStyle';
import { DeviceEventEmitter, View, TouchableHighlight, ActivityIndicator, Text, Image, ToastAndroid, Animated, Easing } from 'react-native';
import { getArrayItem } from '../../services/LocalStorageService';
import Navigator from '../../util/Navigator';

export default class TransactionLoadingButtonComponent extends Component {

  constructor(args) {
    super(args);
    this.state = {showButton: false};
    this.offsetX = new Animated.Value(0);
    this.showOrHideButton.bind(this);
  }

  async componentDidMount() {
    this.isNotMounted = false;
    this.moveDotToTheRight();

    this.showOrHideButton();
    this.setIntervalId = setInterval(async () => {
      this.showOrHideButton()
    }, 1000);
  }


  async showOrHideButton() {

    const pendingTransactions = await getArrayItem('pendingTransactions');

    if (this.props.screenName === 'TransactionsPage') {
      return;
    }

    if (this.isNotMounted) {
      return;
    }

    if (pendingTransactions == undefined || pendingTransactions.length === 0) {
      this.setState({showButton: false});
    } else {
      this.setState({showButton: true});
    }
  }


  componentWillUnmount() {
    this.isNotMounted = true;
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
    Navigator.init(this).pushTransactionsPage();
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
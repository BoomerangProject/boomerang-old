import React, { Component } from 'react';
import styles from './ActivityIndicatorButtonComponentStyle';
import { View, TouchableOpacity, Text, ActivityIndicator, ToastAndroid } from 'react-native';

export default class ActivityIndicatorButtonComponent extends Component {

  constructor(args) {
    super(args);
    this.state = {showActivityIndicator: false};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({showActivityIndicator: nextProps.showActivityIndicator});
  }

  render() {

    return (

      <View style={styles.container}>

        {this.state.showActivityIndicator &&
          <View style={styles.buttonContainer}>
            <ActivityIndicator size="large" color="#ffffff"/>
          </View>}

        {!this.state.showActivityIndicator &&
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.props.onClick}>
            <Text style={styles.button}>{this.props.buttonText}</Text>
          </TouchableOpacity>}
      </View>
    );
  }
}
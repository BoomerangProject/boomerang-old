import React, { Component } from 'react';
import styles from './LoadingPageComponentStyle';
import { View, Image, Text, ActivityIndicator, ToastAndroid } from "react-native";
import kudosContract from '../../services/KudosContractService'
import { default as localStorage } from 'react-native-sensitive-info';
import web3 from '../../services/Web3Service';

const visibleDotsArray = ['. ', '. .', '. . .', '. .', '. '];
const hiddenDotsArray = ['. .', ' .', '', ' .', '. .'];
let setIntervalId;

class LoadingPageComponent extends Component {

  constructor(args) {
    super(args);
    this.state = {visibleDots: '', hiddenDots: '. . .'};
  }

  async componentDidMount() {

    setIntervalId = setInterval(() => {
      this.setState({visibleDots: visibleDotsArray[0]});
      this.setState({hiddenDots: hiddenDotsArray[0]});
      visibleDotsArray.unshift(visibleDotsArray.pop());
      hiddenDotsArray.unshift(hiddenDotsArray.pop());
    }, 500);


    const kudosAccountAddress = await localStorage.getItem('kudosAccountAddress', {
      keychainService: 'kudosKeychain'
    });


    switch (this.props.action) {
      case 'createUserAccount':

        break;
      case 'createWorkerAccount':

        break;
      case 'createBusinessAccount':

        // const transactionReceipt = await kudosContract.methods.registerAsBusiness(kudosAccountAddress).send({from:''});
        // ToastAndroid.show(transactionReceipt.toString(), ToastAndroid.SHORT);
        // const isBusiness = await kudosContract.methods.isBusiness(kudosAccountAddress).call();
        // ToastAndroid.show(isBusiness.toString(), ToastAndroid.SHORT);

        const query = kudosContract.methods.registerAsBusiness(kudosAccountAddress);
        const encodedABI = query.encodeABI();
        const tx = {
          from: "0xdcee2f1da7262362a962d456280a928f4f90bb5e",
          to: "0xe28e955a6e6cb657114f2a9a3fc62c39455933c2",
          gas: 4612388,
          data: encodedABI,
        };

        const privateKey = '4725d5a1c46923e72f04831eab9daf1ec657f256f5e4f139d4835b5197fcffc4';

        const account = web3.eth.accounts.privateKeyToAccount(privateKey);
        console.log("ACCCOUTN " + account.toString());
        console.log("BaaAALANCE:: ");
        web3.eth.getBalance("0xdcee2f1da7262362a962d456280a928f4f90bb5e").then(console.log);

        web3.eth.accounts.signTransaction(tx, privateKey).then(signed => {
          const tran = web3.eth
            .sendSignedTransaction(signed.rawTransaction)
            .on('confirmation', (confirmationNumber, receipt) => {
              console.log('=> confirmation: ' + confirmationNumber);
            })
            .on('transactionHash', hash => {
              console.log('=> hash');
              console.log(hash);
            })
            .on('receipt', receipt => {
              console.log('=> reciept');
              console.log(receipt);
            })
            .on('error', console.error);
        });

        break;
    }
  }

  componentWillUnmount() {
    clearInterval(setIntervalId);
  }

  render() {

    return (

      <View style={styles.container}>

        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("../../images/kudos.png")}/>
        </View>

        <View style={styles.loadingTextContainer}>
          <Text style={styles.text}>Loading Account </Text>
          <Text style={styles.visibleDots}>{this.state.visibleDots}</Text>
          <Text style={styles.hiddenDots}>{this.state.hiddenDots}</Text>
        </View>

        <View style={styles.spacer}/>
      </View>
    );
  }
}

export default LoadingPageComponent;

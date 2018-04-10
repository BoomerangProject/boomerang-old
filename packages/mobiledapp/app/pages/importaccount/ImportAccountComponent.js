import React, { Component } from 'react';
import styles from './ImportAccountComponentStyle';
import { Text, View } from "react-native";

class ImportAccountComponent extends Component {

  // onChangeOfSeedText(event) {
  //   this.setState({ seedText: event.target.value });
  // }
  //
  // onClickOfConfirmButton() {
  //
  //   if (this.state.seedText === null || this.state.seedText.length !== 64) {
  //     window.alert("seed text must be 64 hexadecimal characters");
  //     return;
  //   }
  //
  //   localStorage.setItem("kudosAccountSeed", this.state.seedText);
  //   localStorage.setItem("kudosAddress", ethUtil.privateToAddress(new Buffer(this.state.seedText, "hex")).toString("hex"));
  //   this.props.history.push("/account");
  // }

  render() {

    return (

      <View style={styles.container}>

        <Text>here i am</Text>

        {/*<Image alt="" className="ImportAccount logo" src={require("../../images/kudos.png")}/>*/}

        {/*<Text className="ImportAccount title">Paste a seed to begin</Text>*/}

        {/*<Text className="ImportAccount seedLabel">SEED</Text>*/}

        {/*<View className="ImportAccount seedTextContainer">*/}
          {/*<TextInput className="ImportAccount seedText" maxLength="64" onChange={this.onChangeOfSeedText.bind(this)}></TextInput>*/}
        {/*</View>*/}

        {/*<TouchableOpacity*/}
          {/*style={styles.importAccountButtonContainer}*/}
          {/*onPress={this.onClickOfConfirmButton.bind(this)}>*/}
          {/*<Text style={styles.importAccountButton}>Confirm Seed</Text>*/}
        {/*</TouchableOpacity>*/}

      </View>
    );
  }
}

export default ImportAccountComponent;

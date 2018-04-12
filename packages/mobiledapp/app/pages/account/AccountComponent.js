import React, { Component } from 'react';
import styles from './AccountComponentStyle';

class AccountComponent extends Component {

  render() {

    return (
      <div style={styles.container}>

        <img style={styles.logo} source={require("../../images/kudos.png")}/>
        <Text>Account</Text>

        <Text style={styles.address}>
          {"0x" + localStorage.getItem("kudosAddress")}
        </Text>
      </div>
    );
  }
}

export default AccountComponent;
